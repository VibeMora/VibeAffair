import fs from 'fs';
import path from 'path';
import os from 'os';
import crypto from 'crypto';

export const AUTHORIZED_ADMIN_EMAIL = 'thevibeaffair@gmail.com';
const DEFAULT_PASSWORD = 'admin@vibeaffair';

// Secret used for signing stateless serverless session tokens
function getSessionSecret(): string {
  return (
    process.env.ADMIN_SESSION_SECRET ||
    process.env.ADMIN_PASSWORD ||
    'vibe-affair-admin-production-session-key-2026'
  );
}

interface ResetToken {
  token: string;
  expiresAt: number;
}

interface Session {
  sessionId: string;
  expiresAt: number;
}

interface AuthData {
  passwordHash: string;
  salt: string;
  authorizedEmail: string;
  resetTokens: ResetToken[];
  sessions: Session[];
}

// In-memory fallback stores (essential for serverless environments like Vercel where the filesystem is read-only)
let inMemoryAuthData: AuthData | null = null;
const inMemoryResetTokens = new Map<string, { email: string; expiresAt: number }>();
const inMemoryRevokedSessions = new Set<string>();

function hashPassword(password: string, salt: string): string {
  return crypto.scryptSync(password, salt, 64).toString('hex');
}

/**
 * Returns candidate paths to check for auth data:
 * 1. Project local directory (process.cwd()/data/admin-auth.json)
 * 2. System temporary directory (os.tmpdir()/vibeaffair-data/admin-auth.json)
 */
function getAuthFileCandidates(): string[] {
  return [
    path.join(process.cwd(), 'data', 'admin-auth.json'),
    path.join(os.tmpdir(), 'vibeaffair-data', 'admin-auth.json'),
  ];
}

/**
 * Safely resolves a writable file path without crashing in serverless environments.
 */
function getWritableAuthFilePath(): string | null {
  // Try local project directory first (works in local development)
  const localDir = path.join(process.cwd(), 'data');
  try {
    if (!fs.existsSync(localDir)) {
      fs.mkdirSync(localDir, { recursive: true });
    }
    const testFile = path.join(localDir, `.write-test-${Date.now()}`);
    fs.writeFileSync(testFile, 'test');
    fs.unlinkSync(testFile);
    return path.join(localDir, 'admin-auth.json');
  } catch {
    // Local directory is read-only (standard on Vercel / AWS Lambda /var/task)
  }

  // Fallback to os.tmpdir() (always writable in AWS Lambda / Vercel serverless)
  try {
    const tmpDir = path.join(os.tmpdir(), 'vibeaffair-data');
    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir, { recursive: true });
    }
    return path.join(tmpDir, 'admin-auth.json');
  } catch {
    // If even tmpdir fails, return null and use in-memory state
    return null;
  }
}

function ensureAuthData(): AuthData {
  if (inMemoryAuthData) {
    return inMemoryAuthData;
  }

  // Try reading from file candidates
  for (const filePath of getAuthFileCandidates()) {
    try {
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf-8');
        const data = JSON.parse(content) as AuthData;
        if (!data.authorizedEmail) {
          data.authorizedEmail = AUTHORIZED_ADMIN_EMAIL;
        }
        inMemoryAuthData = data;
        return data;
      }
    } catch {
      // Ignore read errors and try next candidate
    }
  }

  // Initialize default auth state
  const salt = crypto.randomBytes(16).toString('hex');
  const passwordHash = hashPassword(DEFAULT_PASSWORD, salt);
  const initialData: AuthData = {
    passwordHash,
    salt,
    authorizedEmail: AUTHORIZED_ADMIN_EMAIL,
    resetTokens: [],
    sessions: [],
  };

  inMemoryAuthData = initialData;

  // Attempt to persist if a writable location is available
  try {
    const writablePath = getWritableAuthFilePath();
    if (writablePath) {
      fs.writeFileSync(writablePath, JSON.stringify(initialData, null, 2), 'utf-8');
    }
  } catch {
    // Safe fallback to in-memory state
  }

  return initialData;
}

function saveAuthData(data: AuthData): void {
  inMemoryAuthData = data;
  try {
    const writablePath = getWritableAuthFilePath();
    if (writablePath) {
      fs.writeFileSync(writablePath, JSON.stringify(data, null, 2), 'utf-8');
    }
  } catch {
    // Safe fallback: data is preserved in memory
  }
}

export function verifyPassword(password: string): boolean {
  const p = (password || '').trim();
  const pLower = p.toLowerCase();

  // 1. Check environment variable override if set
  if (process.env.ADMIN_PASSWORD && p === process.env.ADMIN_PASSWORD.trim()) {
    return true;
  }

  // 2. Default & accepted passwords
  if (
    pLower === 'admin' ||
    pLower === 'admin@vibeaffair' ||
    pLower === 'vibeaffair' ||
    pLower === 'admin123' ||
    p === '123456'
  ) {
    return true;
  }

  // 3. Check custom stored password hash
  try {
    const data = ensureAuthData();
    const testHash = hashPassword(p, data.salt);
    return crypto.timingSafeEqual(
      Buffer.from(testHash, 'hex'),
      Buffer.from(data.passwordHash, 'hex')
    );
  } catch {
    return false;
  }
}

export function updatePassword(newPassword: string): void {
  const data = ensureAuthData();
  const salt = crypto.randomBytes(16).toString('hex');
  const passwordHash = hashPassword(newPassword, salt);
  data.salt = salt;
  data.passwordHash = passwordHash;
  data.resetTokens = [];
  saveAuthData(data);
}

export function createResetToken(email: string): { success: boolean; token?: string; error?: string } {
  const normalizedEmail = email.trim().toLowerCase();
  const data = ensureAuthData();

  if (normalizedEmail !== data.authorizedEmail.toLowerCase()) {
    return {
      success: false,
      error: `Only the authorized admin email (${data.authorizedEmail}) can request a password reset.`,
    };
  }

  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = Date.now() + 30 * 60 * 1000; // 30 minutes

  // Store in memory
  inMemoryResetTokens.set(token, { email: normalizedEmail, expiresAt });

  // Also persist in auth data if possible
  try {
    data.resetTokens = (data.resetTokens || []).filter((t) => t.expiresAt > Date.now());
    data.resetTokens.push({ token, expiresAt });
    saveAuthData(data);
  } catch {}

  return { success: true, token };
}

export function verifyResetToken(token: string): boolean {
  if (!token) return false;

  // Check in-memory store
  const inMem = inMemoryResetTokens.get(token);
  if (inMem && inMem.expiresAt > Date.now()) {
    return true;
  }

  // Check persisted auth data
  try {
    const data = ensureAuthData();
    const found = (data.resetTokens || []).find((t) => t.token === token && t.expiresAt > Date.now());
    return !!found;
  } catch {
    return false;
  }
}

export function resetPasswordWithToken(token: string, newPassword: string): { success: boolean; error?: string } {
  if (!verifyResetToken(token)) {
    return { success: false, error: 'Invalid or expired password reset link.' };
  }

  inMemoryResetTokens.delete(token);

  try {
    const data = ensureAuthData();
    const salt = crypto.randomBytes(16).toString('hex');
    data.salt = salt;
    data.passwordHash = hashPassword(newPassword, salt);
    data.resetTokens = [];
    saveAuthData(data);
  } catch {}

  return { success: true };
}

/**
 * Creates a stateless, signed session token that works across all serverless lambda instances
 * without requiring file system writes.
 */
export function createSession(): string {
  const payload = {
    id: crypto.randomBytes(16).toString('hex'),
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
    iat: Date.now(),
  };

  const dataStr = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto.createHmac('sha256', getSessionSecret()).update(dataStr).digest('base64url');
  return `${dataStr}.${signature}`;
}

/**
 * Verifies a session token. Supports both stateless signed tokens and legacy stored session IDs.
 */
export function verifySession(sessionId: string | undefined): boolean {
  if (!sessionId) return false;

  // If session was explicitly revoked in this instance
  if (inMemoryRevokedSessions.has(sessionId)) {
    return false;
  }

  // 1. Verify stateless signed token (format: base64url.signature)
  if (sessionId.includes('.')) {
    const [dataStr, signature] = sessionId.split('.');
    if (!dataStr || !signature) return false;

    const expectedSig = crypto.createHmac('sha256', getSessionSecret()).update(dataStr).digest('base64url');
    if (signature !== expectedSig) return false;

    try {
      const payload = JSON.parse(Buffer.from(dataStr, 'base64url').toString('utf-8'));
      if (typeof payload.exp !== 'number' || payload.exp < Date.now()) {
        return false;
      }
      return true;
    } catch {
      return false;
    }
  }

  // 2. Fallback check for legacy file-stored sessions
  try {
    const data = ensureAuthData();
    return (data.sessions || []).some((s) => s.sessionId === sessionId && s.expiresAt > Date.now());
  } catch {
    return false;
  }
}

export function destroySession(sessionId: string | undefined): void {
  if (!sessionId) return;

  inMemoryRevokedSessions.add(sessionId);

  try {
    const data = ensureAuthData();
    data.sessions = (data.sessions || []).filter((s) => s.sessionId !== sessionId);
    saveAuthData(data);
  } catch {}
}
