// components/PreviewBackground.js
"use client";
import { useEffect, useRef, useState } from 'react';

export default function PreviewBackground() {
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
