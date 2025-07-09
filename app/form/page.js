"use client";

import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import React, { useEffect, useState } from "react";
import Image from 'next/image';
import { TEMPLATES } from '@/components/templates';
import FormBuilderClient from "./FormBuilderClient";
import { usePortfolioStore } from '@/store/portfolioStore';

const TemplatePreview = ({ selectedTemplate }) => {
  const portfolio = usePortfolioStore((state) => state.portfolio);
  const templateKey = portfolio.template || selectedTemplate || 'card';
  const Template = TEMPLATES[templateKey];

  if (!Template) {
    return <div>Select a template to see a preview.</div>;
  }

  const Background = Template.background;
  const Card = Template.card;

  return (
    <div className="relative w-full h-full">
      <Background />
      <div className="absolute inset-0 overflow-auto p-4">
        <Card portfolio={portfolio} />
      </div>
    </div>
  );
};



function FormBuilderPageInner() {
  const searchParams = useSearchParams();
  const selectedTemplate = searchParams.get('template') || 'card';

  const { portfolio, updatePortfolio, setPortfolio, resetPortfolio } = usePortfolioStore();
  const [isClient, setIsClient] = useState(false);

  // Sync with localStorage to persist data
  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem('portfolioForm');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setPortfolio(parsed);
      } catch (e) {
        console.error("Failed to parse portfolio from localStorage", e);
      }
    }
  }, [setPortfolio]);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem('portfolioForm', JSON.stringify(portfolio));
    }
  }, [portfolio, isClient]);

  if (!isClient) {
    return <div>Loading form...</div>; // Or a spinner component
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-4 md:p-8 bg-gray-50 min-h-screen">
      {/* Form Side */}
      <div className="w-full lg:w-1/2">
        <FormBuilderClient
          portfolio={portfolio}
          updatePortfolio={updatePortfolio}
          resetPortfolio={resetPortfolio}
          selectedTemplate={selectedTemplate}
        />
      </div>

      {/* Preview Side */}
      <div className="w-full lg:w-1/2 lg:sticky top-8 self-start">
        <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
          <h3 className="text-xl font-bold text-center mb-4 text-gray-700">Live Preview</h3>
          <div className="aspect-[1/1.414] overflow-auto rounded-lg border bg-gray-100 p-4">
            <Suspense fallback={<div>Loading template...</div>}>
              <TemplatePreview selectedTemplate={selectedTemplate} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}

const FormPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <FormBuilderPageInner />
  </Suspense>
);

export default FormPage;
