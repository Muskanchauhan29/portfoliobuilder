// components/GridPortfolioBackground.js
import React from 'react';

export default function GridPortfolioBackground() {
  return (
    <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-100 via-white to-green-100 animate-gradientMove">
      <style jsx global>{`
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradientMove {
          background-size: 200% 200%;
          animation: gradientMove 16s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
