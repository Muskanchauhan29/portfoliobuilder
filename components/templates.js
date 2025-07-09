// components/templates.js
import React from "react";
import Image from 'next/image';
import PreviewBackground from './PreviewBackground';
import PortfolioCard from './PortfolioCard';
import GridPortfolioCard from './GridPortfolioCard';
import ElegantPortfolioCard from './ElegantPortfolioCard';

// --- Modern Gradient Background ---
function ModernGradientBackground() {
  return (
    <div className="absolute inset-0 z-0 bg-gradient-to-br from-indigo-500 via-purple-400 to-pink-400 animate-gradientMove">
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

// --- Minimal Background ---
function MinimalBackground() {
  return (
    <div className="absolute inset-0 z-0 bg-gray-100" />
  );
}

// --- Modern Portfolio Card ---
function ModernPortfolioCard({ portfolio }) {
  if (!portfolio) return null;
  return (
    <div className="relative mx-auto rounded-3xl bg-gradient-to-br from-white/80 to-purple-100/80 backdrop-blur-2xl border border-purple-200 shadow-2xl p-10 md:p-16 flex flex-col items-center max-w-3xl">
      <Image src={portfolio.personalInfo?.photo || ''} alt={portfolio.personalInfo?.name || ''} width={128} height={128} className="w-32 h-32 rounded-full border-4 border-purple-400 shadow-xl mb-6 object-cover" />
      <h2 className="text-4xl font-extrabold text-purple-900 mb-1 text-center drop-shadow-lg">{portfolio.personalInfo?.name || ''}</h2>
      <h3 className="text-2xl font-semibold text-pink-600 mb-4 text-center">{portfolio.personalInfo?.role || ''}</h3>
      <p className="text-gray-700 mb-7 text-center max-w-2xl">{portfolio.personalInfo?.summary || ''}</p>
      <div className="flex flex-wrap gap-4 justify-center mt-4 mb-8">
        {Array.isArray(portfolio.skills) && portfolio.skills.filter(Boolean).length > 0 ? portfolio.skills.filter(Boolean).map((s, i) => (
          <span key={i} className="bg-gradient-to-r from-pink-200 via-purple-200 to-indigo-200 text-purple-900 px-4 py-2 rounded-full text-base font-semibold shadow">{s}</span>
        )) : <div className="text-gray-400 italic">No skills added</div>}
      </div>
      {/* Projects */}
      {Array.isArray(portfolio.projects) && portfolio.projects.filter(p => p.title).length > 0 && (
        <div className="w-full mb-6">
          <h4 className="text-2xl font-bold text-purple-700 mb-2">Projects</h4>
          <ul className="space-y-2">
            {portfolio.projects.filter(p => p.title).map((p, i) => (
              <li key={i} className="bg-purple-50 rounded-xl p-4 shadow flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div>
                  <div className="font-semibold text-lg">{p.title}</div>
                  <div className="text-sm text-gray-600">{p.description}</div>
                  {p.tech && <div className="text-xs text-purple-500 mt-1">Tech: {p.tech}</div>}
                </div>
                {p.link && <a href={p.link} target="_blank" rel="noopener noreferrer" className="text-xs text-purple-600 underline ml-1">View</a>}
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* Education */}
      {Array.isArray(portfolio.education) && portfolio.education.filter(e => e.degree).length > 0 && (
        <div className="w-full mb-6">
          <h4 className="text-2xl font-bold text-purple-700 mb-2">Education</h4>
          <ul className="space-y-2">
            {portfolio.education.filter(e => e.degree).map((e, i) => (
              <li key={i} className="bg-purple-50 rounded-xl p-4 shadow">
                <div className="font-semibold">{e.degree}</div>
                <div className="text-sm text-gray-600">{e.school}</div>
                {e.years && <div className="text-xs text-purple-500 mt-1">Years: {e.years}</div>}
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* Experience */}
      {Array.isArray(portfolio.experience) && portfolio.experience.filter(e => e.role).length > 0 && (
        <div className="w-full mb-2">
          <h4 className="text-2xl font-bold text-purple-700 mb-2">Experience</h4>
          <ul className="space-y-2">
            {portfolio.experience.filter(e => e.role).map((e, i) => (
              <li key={i} className="bg-purple-50 rounded-xl p-4 shadow">
                <div className="font-semibold">{e.role}</div>
                <div className="text-sm text-gray-600">{e.company}</div>
                {e.duration && <div className="text-xs text-purple-500 mt-1">Duration: {e.duration}</div>}
                {e.description && <div className="text-xs text-gray-500 mt-1">{e.description}</div>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}



export const TEMPLATES = {
  card: {
    background: PreviewBackground,
    card: PortfolioCard,
    label: 'Glass Card',
  },
  modern: {
    background: ModernGradientBackground,
    card: ModernPortfolioCard,
    label: 'Modern Gradient',
  },
  grid: {
    background: PreviewBackground,
    card: GridPortfolioCard,
    label: 'Grid Professional',
  },
  elegant: {
    background: PreviewBackground,
    card: ElegantPortfolioCard,
    label: 'Elegant Portfolio',
  },
};
