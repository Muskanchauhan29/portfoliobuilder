// components/PreviewBackground.js
"use client";

export default function PreviewBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <div 
        className="absolute inset-0 animate-gradientMove"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #89f7fe 100%)',
          backgroundSize: '200% 200%',
        }}
      />
      <div 
        className="absolute inset-0 opacity-50 mix-blend-overlay"
        style={{
          backgroundImage: 'radial-gradient(circle at center, white, transparent 60%)',
        }}
      />
      <style jsx global>{`
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradientMove {
          animation: gradientMove 15s ease infinite;
        }
      `}</style>
    </div>
  );
}
