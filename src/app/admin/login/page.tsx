'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const fd = new FormData(e.currentTarget);
    const res = await signIn('credentials', {
      email: fd.get('email'),
      password: fd.get('password'),
      redirect: false,
    });
    setLoading(false);
    if (res?.error) setError('Invalid email or password');
    else router.push('/admin');
  }

  return (
    <div className="w-full min-h-screen bg-[#04060a] flex items-center justify-center px-4">
      <div className="w-full max-w-[400px]">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#2d6aab] to-[#224f81] flex items-center justify-center text-white font-bold text-xl mx-auto mb-4 shadow-[0_8px_24px_rgba(34,79,129,0.5)]">
            KA
          </div>
          <h1 className="text-xl font-semibold text-white tracking-[-0.5px]">Admin Dashboard</h1>
          <p className="text-sm text-[rgba(255,255,255,0.4)] mt-1">Sign in to continue</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] rounded-2xl p-8 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-[12px] font-medium text-[rgba(255,255,255,0.6)] tracking-[0.5px]">Email</label>
            <input
              name="email"
              type="email"
              required
              placeholder="admin@karimabdelaziz.com"
              className="w-full px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl text-white text-sm placeholder:text-[rgba(255,255,255,0.25)] outline-none focus:border-[rgba(95,163,224,0.5)] focus:shadow-[0_0_0_3px_rgba(95,163,224,0.1)] transition-all"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[12px] font-medium text-[rgba(255,255,255,0.6)] tracking-[0.5px]">Password</label>
            <input
              name="password"
              type="password"
              required
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl text-white text-sm placeholder:text-[rgba(255,255,255,0.25)] outline-none focus:border-[rgba(95,163,224,0.5)] focus:shadow-[0_0_0_3px_rgba(95,163,224,0.1)] transition-all"
            />
          </div>

          {error && (
            <p className="text-[13px] text-red-400 bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.2)] rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-[#2d6aab] to-[#3a7fc7] text-white font-semibold text-sm rounded-xl shadow-[0_4px_14px_rgba(34,79,129,0.4)] hover:-translate-y-[1px] hover:shadow-[0_6px_20px_rgba(34,79,129,0.55)] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
