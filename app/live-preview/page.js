"use client";
import Navbar from '@/components/Navbar';
import FormBuilderClient from '../form/FormBuilderClient';
import { usePortfolioStore } from '@/store/portfolioStore';
import { useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import PreviewBackground from '@/components/PreviewBackground';
import PortfolioCard from '@/components/PortfolioCard';
import { TEMPLATES } from '@/components/templates';

import { useEffect } from 'react';

export default function LivePreviewPage() {
  const pdfRef = useRef(null);
  const router = useRouter();
  const portfolio = usePortfolioStore((state) => state.portfolio);
  const setPortfolio = usePortfolioStore((state) => state.setPortfolio);
  const updatePortfolio = usePortfolioStore((state) => state.updatePortfolio);
  const searchParams = useSearchParams();

  // On mount: load from localStorage, then sync template param if present
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolioForm');
      if (saved) {
        setPortfolio(JSON.parse(saved));
      }
    }
  }, [setPortfolio]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlTemplate = searchParams.get('template');
      if (urlTemplate && urlTemplate !== portfolio.template) {
        updatePortfolio('template', urlTemplate);
      }
    }
  }, [searchParams, portfolio?.template, updatePortfolio]);

  // Pick template config
  const templateKey = portfolio?.template || 'card';
  const Template = TEMPLATES[templateKey] || TEMPLATES.card;

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <Navbar />
      {Template.background}
      <main className="flex-1 flex flex-col md:flex-row gap-0 md:gap-8 p-4 md:p-12 items-stretch justify-center relative z-10">
        {/* Form Side */}
        <div className="w-full md:w-1/2 bg-white/90 rounded-2xl shadow-2xl border border-blue-100 backdrop-blur-md p-4 md:p-8 mb-8 md:mb-0 overflow-auto">
          <FormBuilderClient />
        </div>
        {/* Preview Side */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
          <div className="w-full max-w-2xl mx-auto">
            {Template.card(portfolio)}
            <div className="flex flex-wrap gap-4 justify-center mt-8">
              <button ref={pdfRef} className="px-7 py-3 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 border-2 border-white">Export as PDF</button>
              <button className="px-7 py-3 rounded-xl bg-gradient-to-r from-pink-400 via-indigo-400 to-purple-400 text-white font-bold shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 border-2 border-white">Share Link</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
