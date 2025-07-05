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


        {projects.length > 0 && projects.some(p => p.title || p.description) && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Projects</h2>
            <div className="space-y-4">
              {projects.map((project, i) =>
                (project.title || project.description) && (
                  <div key={i} className="p-4 bg-indigo-50 rounded-xl shadow">
                    <div className="font-semibold text-indigo-700">{project.title}</div>
                    <div className="text-gray-700 mb-1">{project.description}</div>
                    {project.link && <a href={project.link} className="underline text-indigo-500" target="_blank" rel="noopener noreferrer">{project.link}</a>}
                  </div>
                )
              )}
            </div>
          </div>
        )}
        {skills.length > 0 && skills.some(s => s) && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.filter(Boolean).map((skill, i) => (
                <span key={i} className="px-3 py-1 rounded-full bg-gradient-to-r from-indigo-200 to-pink-200 text-indigo-700 font-medium shadow text-sm">{skill}</span>
              ))}
            </div>
          </div>
        )}
        {education.length > 0 && education.some(e => e.school || e.degree) && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Education</h2>
            <div className="space-y-2">
              {education.map((edu, i) =>
                (edu.school || edu.degree) && (
                  <div key={i} className="p-3 bg-purple-50 rounded-lg shadow">
                    <div className="font-semibold text-purple-700">{edu.school}</div>
                    <div className="text-gray-700">{edu.degree} {edu.year && <span className="text-gray-400">({edu.year})</span>}</div>
                  </div>
                )
              )}
            </div>
          </div>
        )}
        {experience.length > 0 && experience.some(e => e.company || e.role) && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Experience</h2>
            <div className="space-y-2">
              {experience.map((exp, i) =>
                (exp.company || exp.role) && (
                  <div key={i} className="p-3 bg-green-50 rounded-lg shadow">
                    <div className="font-semibold text-green-700">{exp.company}</div>
                    <div className="text-gray-700">{exp.role} {exp.duration && <span className="text-gray-400">({exp.duration})</span>}</div>
                    <div className="text-gray-600">{exp.description}</div>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
