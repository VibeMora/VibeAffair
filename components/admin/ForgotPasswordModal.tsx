'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, ArrowRight, CheckCircle2, AlertCircle, Loader2, ExternalLink } from 'lucide-react';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ForgotPasswordModal({ isOpen, onClose }: ForgotPasswordModalProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{ message: string; previewUrl?: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/admin/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || 'Failed to send password reset link.');
      } else {
        setSuccessData({
          message: data.message,
          previewUrl: data.previewUrl,
        });
      }
    } catch {
      setError('An unexpected error occurred. Please check your network connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetState = () => {
    setEmail('');
    setError(null);
    setSuccessData(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleResetState}
          />

          {/* Modal Container */}
          <motion.div
            className="relative w-full max-w-md bg-zinc-950/95 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 overflow-hidden"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {/* Close Button */}
            <button
              onClick={handleResetState}
              className="absolute top-5 right-5 p-1.5 text-zinc-400 hover:text-white rounded-full hover:bg-zinc-800/80 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            {!successData ? (
              <>
                {/* Modal Header */}
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-2xl bg-[#9a719d]/20 border border-[#9a719d]/40 flex items-center justify-center text-[#9a719d]">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg font-heading">
                      Reset Admin Password
                    </h3>
                    <p className="text-zinc-400 text-xs font-subtitle">
                      Verification required
                    </p>
                  </div>
                </div>

                <p className="text-zinc-400 text-xs sm:text-sm mt-3 mb-6 leading-relaxed font-body">
                  Enter the authorized email address (<code className="text-zinc-200 bg-zinc-900 px-1.5 py-0.5 rounded text-xs">thevibeaffair@gmail.com</code>) to receive your secure password reset link.
                </p>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-2.5 p-3.5 mb-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs"
                  >
                    <AlertCircle size={16} className="shrink-0 mt-0.5 text-rose-400" />
                    <span>{error}</span>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1.5 font-subtitle uppercase tracking-wider">
                      Authorized Email
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                        <Mail size={16} />
                      </div>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="thevibeaffair@gmail.com"
                        className="w-full pl-10 pr-4 py-3 bg-zinc-900/90 border border-zinc-800 rounded-xl text-white text-sm placeholder-zinc-500 focus:outline-none focus:border-[#9a719d] focus:ring-1 focus:ring-[#9a719d] transition-all"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-[#9a719d] hover:bg-[#865d89] active:scale-[0.98] text-white font-medium text-sm py-3 px-4 rounded-xl transition-all duration-200 shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Sending Link...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Reset Link</span>
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </form>
              </>
            ) : (
              /* Success State */
              <div className="text-center py-3">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 size={24} />
                </div>

                <h4 className="text-white text-lg font-semibold mb-2 font-heading">
                  Reset Link Dispatched
                </h4>

                <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed mb-6 font-body">
                  {successData.message}
                </p>

                <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-left mb-6 text-xs text-zinc-400 space-y-1">
                  <p className="font-semibold text-zinc-300">💡 Testing instructions:</p>
                  <p>The reset link is active for 30 minutes and has been logged to your terminal console.</p>
                </div>

                {successData.previewUrl && (
                  <div className="mb-6">
                    <a
                      href={successData.previewUrl}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-950/40 border border-purple-800/40 text-purple-300 hover:text-white hover:bg-purple-900/40 transition-all text-xs font-medium"
                    >
                      <ExternalLink size={14} />
                      <span>Open Reset Link (Dev Shortcut)</span>
                    </a>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleResetState}
                  className="w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-medium transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
