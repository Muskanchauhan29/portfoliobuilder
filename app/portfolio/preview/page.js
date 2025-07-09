"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import PortfolioTemplateCard from './PortfolioTemplateCard';
import PortfolioTemplateGrid from './PortfolioTemplateGrid';
import PortfolioTemplateMinimal from './PortfolioTemplateMinimal';

export default function PortfolioPreview() {
  const [data, setData] = useState(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("portfolioForm");
      if (saved) setData(JSON.parse(saved));
    } catch {
      setData(null);
    }
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-50 text-gray-900">
        <div className="bg-white/80 p-8 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold mb-4">No Portfolio Data</h2>
          <p className="text-gray-600">Please fill out and save your portfolio first.</p>
        </div>
      </div>
    );
  }

  const { personalInfo = {}, projects = [], skills = [], education = [], experience = [], template = 'card' } = data;

  let TemplateComponent;
  if (template === 'grid') TemplateComponent = PortfolioTemplateGrid;
  else if (template === 'minimal') TemplateComponent = PortfolioTemplateMinimal;
  else TemplateComponent = PortfolioTemplateCard;

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-50 text-gray-900 overflow-x-hidden">
      {/* Animated Background */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-gradient-to-br from-indigo-400 via-purple-300 to-pink-300 opacity-30 rounded-full blur-3xl animate-[blob_18s_ease-in-out_infinite]" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[500px] h-[500px] bg-gradient-to-tr from-pink-300 via-yellow-200 to-indigo-200 opacity-30 rounded-full blur-3xl animate-[blob2_22s_ease-in-out_infinite]" />
        <style>{`
          @keyframes blob {
            0%,100% { transform: scale(1) translate(0,0); }
            33% { transform: scale(1.1) translate(30px, -20px); }
            66% { transform: scale(0.95) translate(-20px, 40px); }
          }
          @keyframes blob2 {
            0%,100% { transform: scale(1) translate(0,0); }
            40% { transform: scale(1.08) translate(-40px, 25px); }
            70% { transform: scale(0.92) translate(40px, -30px); }
          }
        `}</style>
      </div>
      <div className="relative z-10 max-w-3xl mx-auto p-8 bg-white/90 rounded-2xl shadow-2xl border border-indigo-100 backdrop-blur-md mt-8">
        {/* Render the selected template */}
        <TemplateComponent
          personalInfo={personalInfo}
          projects={projects}
          skills={skills}
          education={education}
          experience={experience}
        />
      </div>
    </div>
  );
}
