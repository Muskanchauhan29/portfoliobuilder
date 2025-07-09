"use client";

import Navbar from '@/components/Navbar';
import React, { useEffect, useState, useRef } from "react";
import { TEMPLATES } from '@/components/templates';
import { usePortfolioStore } from '@/store/portfolioStore';
import dynamic from 'next/dynamic';

const PreviewBackground = dynamic(() => import('@/components/PreviewBackground'), {
  ssr: false,
});


// --- Glassmorphism Portfolio Card ---
function PortfolioCard({ portfolio }) {
  const data = portfolio;
  if (!data) return null;
  const templateKey = Object.keys(TEMPLATES).includes(portfolio?.template) ? portfolio.template : 'card';
  const Template = TEMPLATES[templateKey];
  return <Template.card portfolio={data} />;
}

export default function Preview() {
  const portfolio = usePortfolioStore((state) => state.portfolio);
  const setPortfolio = usePortfolioStore((state) => state.setPortfolio);
  const pdfRef = useRef();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem('portfolioForm');
    if (saved) {
      try {
        setPortfolio(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse portfolio from localStorage", e);
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

  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading Preview...</div>
      </div>
    );
  }

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
