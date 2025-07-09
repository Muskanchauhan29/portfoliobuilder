"use client";
import Navbar from '@/components/Navbar';
import FormBuilderClient from '../form/FormBuilderClient';
import { usePortfolioStore } from '@/store/portfolioStore';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Suspense } from "react";
import { useSearchParams } from 'next/navigation';
import PreviewBackground from '@/components/PreviewBackground';
import PortfolioCard from '@/components/PortfolioCard';
import { TEMPLATES } from '@/components/templates';

import { useEffect } from 'react';

const LivePreviewPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <InnerLivePreviewPage />
  </Suspense>
);

const InnerLivePreviewPage = () => {
  const pdfRef = useRef(null);
  const searchParams = useSearchParams();
  const { portfolio, update, resetPortfolio, hydrate, hydrated } = usePortfolioStore();

  // 1. Hydrate store on mount
  useEffect(() => {
    hydrate();
  }, [hydrate]);

  const urlTemplate = searchParams.get('template');

  // 2. Sync URL template to store AFTER hydration
  useEffect(() => {
    if (hydrated && urlTemplate && Object.keys(TEMPLATES).includes(urlTemplate) && urlTemplate !== portfolio.template) {
      update(p => ({ ...p, template: urlTemplate }));
    }
  }, [urlTemplate, portfolio.template, update, hydrated]);

  // 3. Render a loading state until hydrated to prevent mismatch
  if (!hydrated) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  // Determine the final template key to use for rendering.
  const templateKey = (urlTemplate && Object.keys(TEMPLATES).includes(urlTemplate)) ? urlTemplate : portfolio.template;
  const Template = TEMPLATES[templateKey]?.card || null;
  const TemplateBackground = TEMPLATES[templateKey]?.background || null;

  const handleFormUpdate = (path, value) => {
    update(p => {
      const newPortfolio = { ...p };
      let current = newPortfolio;
      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]];
      }
      current[path[path.length - 1]] = value;
      return newPortfolio;
    });
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <Navbar />
      {TemplateBackground && <TemplateBackground />}
      <main className="flex-1 flex flex-col md:flex-row gap-0 md:gap-8 p-4 md:p-12 items-stretch justify-center relative z-10">
        <div className="w-full md:w-1/2 bg-white/90 rounded-2xl shadow-2xl border border-blue-100 backdrop-blur-md p-4 md:p-8 mb-8 md:mb-0 overflow-auto">
          <FormBuilderClient
            portfolio={portfolio}
            updatePortfolio={handleFormUpdate}
            resetPortfolio={resetPortfolio}
            selectedTemplate={templateKey}
          />
        </div>
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
          <div className="w-full max-w-2xl mx-auto">
            {Template && <Template key={portfolio.template} portfolio={portfolio} />}
            <div className="flex flex-wrap gap-4 justify-center mt-8">
              <button ref={pdfRef} className="px-7 py-3 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 border-2 border-white">Export as PDF</button>
              <button className="px-7 py-3 rounded-xl bg-gradient-to-r from-pink-400 via-indigo-400 to-purple-400 text-white font-bold shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 border-2 border-white">Share Link</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LivePreviewPage;
