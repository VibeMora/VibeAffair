'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle2, Loader2 } from 'lucide-react';
import Link from 'next/link';

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');

  const [checkingToken, setCheckingToken] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);
  const [tokenError, setTokenError] = useState('');

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function verify() {
      if (!token) {
        if (isMounted) {
          setCheckingToken(false);
          setTokenValid(false);
          setTokenError('No reset token provided.');
        }
        return;
      }

      try {
        const res = await fetch(`/api/admin/reset-password?token=${encodeURIComponent(token)}`);
        const data = await res.json();

        if (isMounted) {
          if (res.ok && data.valid) {
            setTokenValid(true);
          } else {
            setTokenValid(false);
            setTokenError(data.error || 'This password reset link is invalid or has expired.');
          }
          setCheckingToken(false);
        }
      } catch {
        if (isMounted) {
          setTokenValid(false);
          setTokenError('Failed to verify reset token.');
          setCheckingToken(false);
        }
      }
    }

    verify();

    return () => {
      isMounted = false;
    };
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!newPassword.trim()) {
      setFormError('Please enter a new password.');
      return;
    }

    if (newPassword.length < 6) {
      setFormError('Password must be at least 6 characters.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setFormError('Passwords do not match.');
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch('/api/admin/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setFormError(data.error || 'Failed to update password.');
      } else {
        setSuccess(true);
      }
    } catch {
      setFormError('An unexpected network error occurred.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center p-6"
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
      <div
        className="w-full max-w-sm flex flex-col items-center text-center"
        style={{ width: '100%', maxWidth: '340px', margin: '0 auto' }}
      >
        {checkingToken ? (
          <div className="flex flex-col items-center gap-2 py-10" style={{ color: '#71717a' }}>
            <Loader2 className="w-6 h-6 animate-spin" style={{ color: '#9a719d' }} />
            <p style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Verifying link...
            </p>
          </div>
        ) : !tokenValid ? (
          <div className="space-y-4">
            <p style={{ color: '#ef4444', fontSize: '13px', fontWeight: 500 }}>{tokenError}</p>
            <Link
              href="/admin"
              style={{
                display: 'inline-block',
                marginTop: '12px',
                fontSize: '13px',
                color: '#71717a',
                textDecoration: 'underline',
                textUnderlineOffset: '4px',
              }}
            >
              Back to admin login
            </Link>
          </div>
        ) : success ? (
          <div className="space-y-4" style={{ textAlign: 'center' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                margin: '0 auto 12px auto',
                borderRadius: '50%',
                backgroundColor: '#ecfdf5',
                color: '#059669',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CheckCircle2 size={26} />
            </div>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#18181b' }}>
              Password Updated
            </h2>
            <p style={{ color: '#71717a', fontSize: '13px' }}>
              You can now access the admin portal with your new password.
            </p>
            <button
              type="button"
              onClick={() => router.push('/admin')}
              style={{
                marginTop: '18px',
                width: '100%',
                padding: '12px 32px',
                backgroundColor: '#9a719d',
                color: '#ffffff',
                fontSize: '13px',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                borderRadius: '9999px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Go to Login
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col items-center"
            style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <p style={{ color: '#52525b', fontSize: '13px', marginBottom: '16px' }}>
              Enter new master password
            </p>

            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input
                type="password"
                required
                autoFocus
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New password (min 6 chars)"
                style={{
                  width: '100%',
                  padding: '14px 24px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #d4d4d8',
                  borderRadius: '9999px',
                  color: '#18181b',
                  fontSize: '14px',
                  textAlign: 'center',
                  outline: 'none',
                }}
              />

              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                style={{
                  width: '100%',
                  padding: '14px 24px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #d4d4d8',
                  borderRadius: '9999px',
                  color: '#18181b',
                  fontSize: '14px',
                  textAlign: 'center',
                  outline: 'none',
                }}
              />
            </div>

            {formError && (
              <p style={{ color: '#ef4444', fontSize: '13px', marginTop: '10px' }}>
                {formError}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              style={{
                marginTop: '18px',
                width: '100%',
                padding: '12px 32px',
                backgroundColor: '#9a719d',
                color: '#ffffff',
                fontSize: '13px',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                borderRadius: '9999px',
                border: 'none',
                cursor: submitting ? 'wait' : 'pointer',
                opacity: submitting ? 0.7 : 1,
              }}
            >
              {submitting ? 'Saving...' : 'Save Password'}
            </button>

            <Link
              href="/admin"
              style={{
                marginTop: '16px',
                fontSize: '13px',
                color: '#71717a',
                textDecoration: 'underline',
                textUnderlineOffset: '4px',
              }}
            >
              Back to login
            </Link>
          </form>
        )}
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            minHeight: '100vh',
            backgroundColor: 'rgb(255, 251, 246)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Loader2 className="w-6 h-6 animate-spin" style={{ color: '#9a719d' }} />
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}
