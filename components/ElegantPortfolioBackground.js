// components/ElegantPortfolioBackground.js
import React from 'react';

export default function ElegantPortfolioBackground() {
  return (
    <div className="absolute inset-0 z-0 bg-gradient-to-br from-pink-100 via-purple-100 to-yellow-100 animate-gradientMove">
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
    </div>
  );
}
