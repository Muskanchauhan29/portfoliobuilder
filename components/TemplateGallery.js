// components/TemplateGallery.js
import React from 'react';
import { TEMPLATES } from './templates';

export default function TemplateGallery({ selected, onSelect }) {
  return (
    <div className="flex flex-wrap gap-6 justify-center my-8">
      {Object.entries(TEMPLATES).map(([key, tpl]) => (
        <button
          key={key}
          onClick={() => onSelect(key)}
          className={`relative group rounded-2xl border-2 shadow-lg transition-all duration-200 overflow-hidden w-56 h-80 flex flex-col items-center ${selected === key ? 'border-blue-500 scale-105 ring-4 ring-blue-200' : 'border-gray-200 hover:scale-105 hover:border-blue-400'}`}
        >
          <div className="absolute inset-0 z-0 pointer-events-none">
            {/* Template background preview */}
            {tpl.background}
          </div>
          <div className="relative z-10 flex-1 flex flex-col justify-end items-center pb-6 pt-12 px-4">
            {/* Template card preview (mini) */}
            <div className="w-40 mx-auto">
              {tpl.card({
                personalInfo: {
                  name: tpl.label + ' Example',
                  role: 'Frontend Developer',
                  photo: '',
                  summary: 'A beautiful sample portfolio card.',
                },
                skills: ['React', 'Next.js', 'Tailwind'],
                projects: [],
                education: [],
                experience: [],
              })}
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 px-3 py-2 bg-white/80 text-center font-bold text-lg text-gray-900 z-20 border-t border-gray-200">
            {tpl.label}
          </div>
          {selected === key && (
            <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full px-3 py-1 text-xs font-semibold shadow">Selected</div>
          )}
        </button>
      ))}
    </div>
  );
}
