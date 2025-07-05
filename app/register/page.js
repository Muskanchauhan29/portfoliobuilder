"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Registration failed');
      setSuccess('Registration successful! Redirecting...');
      setTimeout(() => router.push('/login'), 1200);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-200 via-purple-100 to-pink-100">
      <div className="absolute inset-0 bg-cover bg-center opacity-60" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1200&q=80)'}} />
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col md:flex-row rounded-3xl overflow-hidden shadow-2xl bg-white/70 backdrop-blur-xl">
        {/* Left: Branding */}
        <div className="flex-1 flex flex-col justify-center items-center p-10 md:p-14 bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-50">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-indigo-700">PORTFOLIO BUILDER</h2>
          <h3 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900">Create Your Account</h3>
          <p className="text-gray-700 max-w-xs text-center">Start building your professional portfolio with beautiful templates and easy-to-use tools.</p>
        </div>
        {/* Right: Register Form */}
        <div className="flex-1 flex flex-col justify-center items-center p-10 md:p-14">
          <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-semibold mb-1">Name</label>
              <input id="name" type="text" required value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none bg-white/80 placeholder-gray-400" placeholder="Enter your name" />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">Email</label>
              <input id="email" type="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none bg-white/80 placeholder-gray-400" placeholder="Enter your email" />
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-700 font-semibold mb-1">Password</label>
              <input id="password" type="password" required value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none bg-white/80 placeholder-gray-400" placeholder="********" />
            </div>
            <div>
              <label htmlFor="confirm" className="block text-gray-700 font-semibold mb-1">Confirm Password</label>
              <input id="confirm" type="password" required value={confirm} onChange={e => setConfirm(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none bg-white/80 placeholder-gray-400" placeholder="********" />
            </div>
            {error && <div className="text-red-600 text-sm font-medium">{error}</div>}
            {success && <div className="text-green-600 text-sm font-medium">{success}</div>}
            <button type="submit" disabled={loading} className="w-full py-3 rounded-lg bg-indigo-600 text-white font-bold shadow hover:bg-indigo-700 transition-colors disabled:opacity-60">{loading ? 'Creating Account...' : 'CREATE ACCOUNT'}</button>
            <div className="flex items-center my-2">
              <div className="flex-1 h-px bg-gray-300" />
              <span className="mx-2 text-gray-400 text-sm">or</span>
              <div className="flex-1 h-px bg-gray-300" />
            </div>
            <button type="button" disabled className="w-full py-3 rounded-lg bg-white/90 text-gray-700 font-bold shadow border border-gray-300 flex items-center justify-center gap-2 cursor-not-allowed">
              <svg className="w-5 h-5" viewBox="0 0 48 48"><g><circle fill="#fff" cx="24" cy="24" r="20"/><path fill="#4285f4" d="M34.6 24.3c0-.7-.1-1.4-.2-2H24v4.1h6c-.2 1.1-1 2.8-2.8 3.9l-.1.9 4.1 3.2.3.1c2.3-2.1 3.6-5.1 3.6-8.2z"/><path fill="#34a853" d="M24 36c3.2 0 5.8-1.1 7.7-2.9l-3.7-2.9c-1 .7-2.3 1.2-4 1.2-3.1 0-5.7-2.1-6.6-5.1h-4v3.2C16.2 33.8 19.8 36 24 36z"/><path fill="#fbbc04" d="M17.4 25.3c-.2-.7-.4-1.3-.4-2s.1-1.3.2-2v-3.2h-4A11.99 11.99 0 0012 24c0 1.9.5 3.7 1.4 5.2l4-3.2z"/><path fill="#ea4335" d="M24 14.8c1.8 0 3.3.6 4.5 1.7l3.4-3.4C29.8 11.1 27.2 10 24 10c-4.2 0-7.8 2.2-9.8 5.5l4 3.2c.9-2.8 3.5-4.9 6.8-4.9z"/></g></svg>
              Sign up with Google (Coming Soon)
            </button>
            <div className="text-sm mt-2 text-center text-gray-500">
              Already have an account? <Link href="/login" className="text-indigo-600 hover:underline">Sign in</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
