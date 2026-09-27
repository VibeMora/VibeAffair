'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import AdminGallery from './AdminGallery';

interface AdminLoginFormProps {
  onLoginSuccess?: () => void;
}

export default function AdminLoginForm({ onLoginSuccess }: AdminLoginFormProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [view, setView] = useState<'login' | 'forgot'>('login');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [forgotSuccess, setForgotSuccess] = useState<{ message: string; previewUrl?: string } | null>(null);

  // Check if session is already active
  useEffect(() => {
    fetch('/api/admin/session')
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated) {
          setIsAuthenticated(true);
          onLoginSuccess?.();
        }
      })
      .catch(() => {});
  }, [onLoginSuccess]);

  const handleLoginSubmit = async (e?: React.SyntheticEvent) => {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }
    setError(null);
    setLoading(true);

    const cleanPassword = password.trim();

    try {
  const res = await fetch('/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password: cleanPassword }),
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    setError(data.error || 'Invalid password');
    return;
  }

  setIsAuthenticated(true);
  onLoginSuccess?.();

} catch (err) {
  console.error('[Admin Login Fetch Error]:', err);
  setError('Connection failed. Please try again.');
} finally {
  setLoading(false);
}
  };

  // If authenticated, display AdminGallery directly
  if (isAuthenticated) {
    return (
      <AdminGallery
        onLogout={() => {
          setIsAuthenticated(false);
          setPassword('');
        }}
      />
    );
  }

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setForgotSuccess(null);

    if (!email.trim()) {
      setError('Please enter the authorized admin email.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/admin/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || 'Failed to send reset link.');
      } else {
        setForgotSuccess({
          message: data.message,
          previewUrl: data.previewUrl,
        });
      }
    } catch {
      setError('Connection failed. Please check your network.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center p-6 select-none"
      style={{
        backgroundColor: 'rgb(255, 251, 246)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-sans), system-ui, -apple-system, sans-serif',
      }}
    >
      <Navbar/>
      <div
        className="w-full max-w-sm flex flex-col items-center text-center"
        style={{ width: '100%', maxWidth: '340px', margin: '0 auto' }}
      >
        {view === 'login' ? (
          /* ==================== ONLY INPUT, ENTER BUTTON, FORGOT PASSWORD ==================== */
          <form
            action="#"
            method="POST"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleLoginSubmit(e);
            }}
            className="w-full flex flex-col items-center"
            style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            {/* 1. Center Input */}
            <input
              type="password"
              autoFocus
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError(null);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  e.stopPropagation();
                  handleLoginSubmit(e);
                }
              }}
              placeholder="Enter password"
              className="w-full text-center outline-none transition-all shadow-sm"
              style={{
                width: '100%',
                padding: '14px 24px',
                backgroundColor: '#ffffff',
                border: '1px solid #d4d4d8',
                borderRadius: '9999px',
                color: '#18181b',
                fontSize: '15px',
                textAlign: 'center',
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                outline: 'none',
              }}
            />

            {/* Error Message */}
            {error && (
              <p
                className="mt-3 text-xs font-medium"
                style={{ color: '#ef4444', fontSize: '13px', marginTop: '10px' }}
              >
                {error}
              </p>
            )}

            {/* 2. Enter Button Below Input */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleLoginSubmit(e);
              }}
              disabled={loading}
              className="transition-all shadow-sm active:scale-95"
              style={{
                marginTop: '18px',
                minWidth: '140px',
                padding: '12px 32px',
                backgroundColor: '#9a719d',
                color: '#ffffff',
                fontSize: '13px',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                borderRadius: '9999px',
                border: 'none',
                cursor: loading ? 'wait' : 'pointer',
                opacity: loading ? 0.7 : 1,
                boxShadow: '0 2px 6px rgba(154, 113, 157, 0.25)',
              }}
            >
              {loading ? 'Entering...' : 'Enter'}
            </button>

            {/* 3. Forgot Password Link Below Enter */}
            <button
              type="button"
              onClick={() => {
                setView('forgot');
                setError(null);
              }}
              style={{
                marginTop: '16px',
                backgroundColor: 'transparent',
                border: 'none',
                color: '#71717a',
                fontSize: '13px',
                textDecoration: 'underline',
                textUnderlineOffset: '4px',
                cursor: 'pointer',
              }}
            >
              Forgot password?
            </button>
          </form>
        ) : (
          /* ==================== FORGOT PASSWORD VIEW ==================== */
          <form
            action="#"
            method="POST"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleForgotSubmit(e);
            }}
            className="w-full flex flex-col items-center"
            style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <p
              style={{
                color: '#52525b',
                fontSize: '13px',
                marginBottom: '16px',
              }}
            >
              Enter authorized admin email
            </p>

            {/* Email Input */}
            <input
              type="email"
              autoFocus
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError(null);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  e.stopPropagation();
                  handleForgotSubmit(e);
                }
              }}
              placeholder="thevibeaffair@gmail.com"
              style={{
                width: '100%',
                padding: '14px 24px',
                backgroundColor: '#ffffff',
                border: '1px solid #d4d4d8',
                borderRadius: '9999px',
                color: '#18181b',
                fontSize: '14px',
                textAlign: 'center',
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                outline: 'none',
              }}
            />

            {/* Error Message */}
            {error && (
              <p
                style={{ color: '#ef4444', fontSize: '13px', marginTop: '10px' }}
              >
                {error}
              </p>
            )}

            {/* Success Message */}
            {forgotSuccess && (
              <div
                style={{
                  marginTop: '16px',
                  width: '100%',
                  padding: '14px',
                  backgroundColor: '#ecfdf5',
                  border: '1px solid #a7f3d0',
                  borderRadius: '16px',
                  color: '#065f46',
                  fontSize: '12px',
                }}
              >
                <p style={{ fontWeight: 600 }}>{forgotSuccess.message}</p>
                <p style={{ color: '#6b7280', fontSize: '11px', marginTop: '4px' }}>
                  Reset link is active for 30 minutes and logged to terminal.
                </p>
                {forgotSuccess.previewUrl && (
                  <a
                    href={forgotSuccess.previewUrl}
                    style={{
                      display: 'inline-block',
                      marginTop: '8px',
                      padding: '6px 16px',
                      backgroundColor: '#9a719d',
                      color: '#ffffff',
                      borderRadius: '9999px',
                      fontSize: '12px',
                      fontWeight: 500,
                      textDecoration: 'none',
                    }}
                  >
                    Open Reset Link
                  </a>
                )}
              </div>
            )}

            {/* Send Reset Link Button */}
            {!forgotSuccess && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleForgotSubmit(e);
                }}
                disabled={loading}
                style={{
                  marginTop: '18px',
                  minWidth: '150px',
                  padding: '12px 32px',
                  backgroundColor: '#9a719d',
                  color: '#ffffff',
                  fontSize: '13px',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  borderRadius: '9999px',
                  border: 'none',
                  cursor: loading ? 'wait' : 'pointer',
                  opacity: loading ? 0.7 : 1,
                  boxShadow: '0 2px 6px rgba(154, 113, 157, 0.25)',
                }}
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
            )}

            {/* Back to Login Link */}
            <button
              type="button"
              onClick={() => {
                setView('login');
                setError(null);
                setForgotSuccess(null);
              }}
              style={{
                marginTop: '16px',
                backgroundColor: 'transparent',
                border: 'none',
                color: '#71717a',
                fontSize: '13px',
                textDecoration: 'underline',
                textUnderlineOffset: '4px',
                cursor: 'pointer',
              }}
            >
              Back to login
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
