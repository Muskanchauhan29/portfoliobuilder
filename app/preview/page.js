"use client";

import Navbar from '@/components/Navbar';
import { useRef } from 'react';
import { usePortfolioStore } from '@/store/portfolioStore';

// --- Stunning Animated Background ---
function PreviewBackground() {
  const [bgIndex, setBgIndex] = useState(0);
  const bgImages = [
    'https://source.unsplash.com/random/1600x900/?technology,portfolio,developer,code,creative&sig=11',
    'https://source.unsplash.com/random/1600x900/?technology,portfolio,developer,code,creative&sig=12',
    'https://source.unsplash.com/random/1600x900/?technology,portfolio,developer,code,creative&sig=13',
    'https://source.unsplash.com/random/1600x900/?technology,portfolio,developer,code,creative&sig=14',
    'https://source.unsplash.com/random/1600x900/?technology,portfolio,developer,code,creative&sig=15',
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % bgImages.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);
  // Particle overlay
  const ParticlesOverlay = () => {
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
      const particles = Array.from({ length: 36 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 2 + Math.random() * 3,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5,
        color: `hsla(${Math.random() * 360}, 85%, 65%, 0.5)`
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
          p.x += p.dx;
          p.y += p.dy;
          if (p.x < 0 || p.x > width) p.dx *= -1;
          if (p.y < 0 || p.y > height) p.dy *= -1;
        }
        animationId = requestAnimationFrame(draw);
      }
      draw();
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
  };
  return (
    <>
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
      {/* Animated gradient overlay */}
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
      <ParticlesOverlay />
      <style jsx global>{`
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
    </>
  );
}

// --- Glassmorphism Portfolio Card ---
function PortfolioCard({ portfolio }) {
  const data = portfolio;
  if (!data) return null;
  return (
    <div className="relative mx-auto rounded-3xl bg-white/30 backdrop-blur-2xl border border-white/40 shadow-2xl p-8 md:p-12 flex flex-col items-center"
      style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)' }}>
      {/* Reflection effect */}
      <div className="absolute top-0 left-0 w-full h-1/4 pointer-events-none rounded-3xl"
        style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.23) 0%, rgba(255,255,255,0.06) 100%)', opacity: 0.7 }} />
      <img src={data.photo} alt={data.name} className="w-28 h-28 rounded-full border-4 border-white shadow-lg mb-4 object-cover" />
      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-1 text-center drop-shadow-lg">{data.name}</h2>
      <h3 className="text-xl md:text-2xl font-semibold text-indigo-600 mb-3 text-center">{data.title}</h3>
      <p className="text-gray-700 mb-5 text-center max-w-xl">{data.bio}</p>
      {/* Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-4">
        {/* Projects */}
        <div className="bg-white/60 rounded-2xl p-5 shadow-lg flex-1">
          <div className="flex items-center gap-2 mb-2"><span className="text-indigo-500 text-lg">📁</span><span className="font-bold">Projects</span></div>
          {data.projects.map((p, i) => (
            <div key={i} className="mb-2">
              <a href={p.link} className="text-indigo-700 font-semibold hover:underline transition-colors">{p.name}</a>
              <div className="text-sm text-gray-600">{p.desc}</div>
            </div>
          ))}
        </div>
        {/* Skills */}
        <div className="bg-white/60 rounded-2xl p-5 shadow-lg flex-1">
          <div className="flex items-center gap-2 mb-2"><span className="text-green-500 text-lg">🛠️</span><span className="font-bold">Skills</span></div>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((s, i) => (
              <span key={i} className="bg-gradient-to-r from-indigo-300 via-purple-200 to-pink-200 text-indigo-900 px-3 py-1 rounded-full text-sm font-semibold shadow">{s}</span>
            ))}
          </div>
        </div>
        {/* Education */}
        <div className="bg-white/60 rounded-2xl p-5 shadow-lg flex-1">
          <div className="flex items-center gap-2 mb-2"><span className="text-pink-500 text-lg">🎓</span><span className="font-bold">Education</span></div>
          {data.education.map((e, i) => (
            <div key={i} className="mb-1">
              <div className="font-semibold text-indigo-800">{e.degree}</div>
              <div className="text-sm text-gray-600">{e.school} ({e.year})</div>
            </div>
          ))}
        </div>
        {/* Work Experience */}
        <div className="bg-white/60 rounded-2xl p-5 shadow-lg flex-1">
          <div className="flex items-center gap-2 mb-2"><span className="text-yellow-500 text-lg">💼</span><span className="font-bold">Work Experience</span></div>
          {data.experience.map((e, i) => (
            <div key={i} className="mb-1">
              <div className="font-semibold text-indigo-800">{e.role}</div>
              <div className="text-sm text-gray-600">{e.company} ({e.year})</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { useEffect } from 'react';

export default function Preview() {
  const portfolio = usePortfolioStore((state) => state.portfolio);
  const setPortfolio = usePortfolioStore((state) => state.setPortfolio);
  const pdfRef = useRef();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolioForm');
      if (saved) {
        setPortfolio(JSON.parse(saved));
      }
    }
  }, [setPortfolio]);
  // Export as PDF (stub if html2pdf.js is not installed)
  const handleExportPDF = () => {
    if (window.html2pdf) {
      window.html2pdf(pdfRef.current);
    } else {
      alert('PDF export requires html2pdf.js. Please install or include it.');
    }
  };

  const handleShare = () => {
    alert('Shareable link functionality coming soon!');
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <Navbar />
      {/* Stunning animated background */}
      <PreviewBackground />
      {/* Portfolio Card (centered, glassmorphism, always shows demo if no user data) */}
      <main className="flex-1 flex flex-col items-center justify-center py-16 relative z-40">
        <div className="w-full max-w-3xl mx-auto">
          <PortfolioCard portfolio={portfolio} />
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <button onClick={handleExportPDF} className="px-7 py-3 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 border-2 border-white">Export as PDF</button>
            <button onClick={handleShare} className="px-7 py-3 rounded-xl bg-gradient-to-r from-pink-400 via-indigo-400 to-purple-400 text-white font-bold shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 border-2 border-white">Share Link</button>
          </div>
        </div>
      </main>
    </div>
  );
}
