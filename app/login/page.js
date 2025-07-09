"use client";

import { useState } from 'react';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

// Animated particles overlay component
function ParticlesOverlay() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    const dpr = window.devicePixelRatio || 1;
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    // Particle config
    const particles = Array.from({ length: 32 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 1.8 + Math.random() * 2.7,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
      color: `hsla(${Math.random() * 360}, 80%, 60%, 0.55)`
    }));
    function draw() {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 16;
        ctx.fill();
        // Move
        p.x += p.dx;
        p.y += p.dy;
        // Bounce
        if (p.x < 0 || p.x > width) p.dx *= -1;
        if (p.y < 0 || p.y > height) p.dy *= -1;
      }
      animationId = requestAnimationFrame(draw);
    }
    draw();
    // Resize handler
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-30"
      style={{ width: '100vw', height: '100vh', opacity: 0.7 }}
      aria-hidden="true"
    />
  );
}

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Dynamic background logic
  const [bgIndex, setBgIndex] = useState(0);
  const bgImages = [
    'https://source.unsplash.com/random/1600x900/?technology,portfolio,developer,code,creative&sig=1',
    'https://source.unsplash.com/random/1600x900/?technology,portfolio,developer,code,creative&sig=2',
    'https://source.unsplash.com/random/1600x900/?technology,portfolio,developer,code,creative&sig=3',
    'https://source.unsplash.com/random/1600x900/?technology,portfolio,developer,code,creative&sig=4',
    'https://source.unsplash.com/random/1600x900/?technology,portfolio,developer,code,creative&sig=5',
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % bgImages.length);
    }, 8000); // Change every 8 seconds
    return () => clearInterval(interval);
  }, [bgImages.length]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      setLoading(false);
      if (!response.ok) {
        setError(data.error || 'Login failed.');
      } else {
        router.push('/templates');
      }
    } catch (err) {
      setError('Server error.');
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Dynamic, animated background image that changes every 8 seconds */}
      {/* Unsplash slideshow with smooth crossfade */}
      {bgImages.map((img, idx) => (
        <div
          key={img}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[2000ms] will-change-opacity ${idx === bgIndex ? 'opacity-100 z-0' : 'opacity-0 z-0'}`}
          style={{
            backgroundImage: `url('${img}')`,
            filter: 'brightness(0.7) saturate(1.3)',
            transition: 'opacity 2s cubic-bezier(0.4,0,0.2,1)',
          }}
        />
      ))}
      {/* Animated gradient overlay (more vibrant, blurred) */}
      <div className="pointer-events-none absolute inset-0 z-20 animate-gradientMove"
        style={{
          background:
            'linear-gradient(120deg, rgba(255,0,150,0.45) 0%, rgba(0,229,255,0.35) 50%, rgba(0,255,135,0.35) 100%)',
          opacity: 0.8,
          filter: 'blur(8px)',
          mixBlendMode: 'screen',
        }}
      />
      {/* Vignette overlay */}
      <div className="pointer-events-none absolute inset-0 z-30" style={{
        background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 60%, rgba(0,0,0,0.18) 100%)',
        mixBlendMode: 'multiply',
      }} />
      {/* Animated particles overlay */}
      {isClient && <ParticlesOverlay />}
      <style jsx global>{`
        @keyframes bgMove {
          0% { background-position: 50% 50%; }
          50% { background-position: 55% 60%; }
          100% { background-position: 50% 50%; }
        }
        .animate-bgMove {
          animation: bgMove 12s ease-in-out infinite;
        }
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradientMove {
          background-size: 200% 200%;
          animation: gradientMove 18s ease-in-out infinite;
        }
      `}</style>
      <style jsx global>{`
        @keyframes bgMove {
          0% { background-position: 50% 50%; }
          50% { background-position: 55% 60%; }
          100% { background-position: 50% 50%; }
        }
        .animate-bgMove {
          animation: bgMove 12s ease-in-out infinite;
        }
      `}</style>
      {/* Glassmorphism login card with reflection */}
      <div className="relative z-40 w-full max-w-4xl mx-auto flex flex-col md:flex-row rounded-3xl overflow-hidden shadow-2xl bg-white/30 backdrop-blur-2xl border border-white/40" style={{ marginTop: '120px', boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2)' }}>
        {/* Reflection effect */}
        <div className="absolute top-0 left-0 w-full h-1/3 pointer-events-none" style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.27) 0%, rgba(255,255,255,0.06) 100%)',
          opacity: 0.7,
        }} />
        {/* Left: Branding */}
        <div className="flex-1 flex flex-col justify-center items-center p-10 md:p-14 bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-50">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-indigo-700">PORTFOLIO BUILDER</h2>
          <h3 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900">Showcase Your Brilliance</h3>
          <p className="text-gray-700 max-w-xs text-center">Create, customize, and share your professional story with stunning visuals and effortless tools.</p>
        </div>
        {/* Right: Login Form */}
        <div className="flex-1 flex flex-col justify-center items-center p-10 md:p-14">
          <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6">
            <div>
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">Email</label>
              <input id="email" type="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none bg-white/80 placeholder-gray-400" placeholder="Enter your email" />
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-700 font-semibold mb-1">Password</label>
              <input id="password" type="password" required value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none bg-white/80 placeholder-gray-400" placeholder="********" />
            </div>
            {error && <div className="text-red-600 text-sm font-medium">{error}</div>}
            <button type="submit" disabled={loading} className="w-full py-3 rounded-lg bg-indigo-600 text-white font-bold shadow hover:bg-indigo-700 transition-colors disabled:opacity-60">{loading ? 'Signing in...' : 'SIGN IN'}</button>
            <div className="flex justify-between text-sm mt-2">
              <Link href="#" className="text-indigo-600 hover:underline">Forgot password?</Link>
              <span className="text-gray-500">Are you new? <Link href="/register" className="text-indigo-600 hover:underline">Create an Account</Link></span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
