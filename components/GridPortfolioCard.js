// components/GridPortfolioCard.js
import React from 'react';
import Image from 'next/image';

export default function GridPortfolioCard({ portfolio }) {
  if (!portfolio) return null;
  return (
    <div className="relative mx-auto rounded-3xl bg-white/90 border border-blue-200 shadow-2xl p-10 md:p-12 flex flex-col items-center max-w-5xl overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {typeof window !== 'undefined' && require('./GridPortfolioBackground').default()}
      </div>
      <div className="relative z-10 flex flex-col md:flex-row w-full gap-8">
        {/* Left: Personal Info & Skills */}
        <div className="flex flex-col items-center md:items-start md:w-1/3 w-full mb-8 md:mb-0 sticky top-8 self-start bg-white/80 rounded-2xl p-6 shadow-md">
          <Image src={portfolio.personalInfo?.photo || ''} alt={portfolio.personalInfo?.name || ''} width={112} height={112} className="w-28 h-28 rounded-full border-4 border-blue-400 shadow-lg mb-4 object-cover" />
          <h2 className="text-3xl font-extrabold text-blue-900 mb-1 text-center md:text-left">{portfolio.personalInfo?.name || ''}</h2>
          <h3 className="text-xl font-semibold text-blue-500 mb-2 text-center md:text-left">{portfolio.personalInfo?.role || ''}</h3>
          <p className="text-gray-600 mb-4 text-center md:text-left">{portfolio.personalInfo?.summary || ''}</p>
          <h4 className="text-lg font-bold text-blue-700 mt-2 mb-1">Skills</h4>
          <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-2">
            {Array.isArray(portfolio.skills) && portfolio.skills.filter(Boolean).length > 0 ? portfolio.skills.filter(Boolean).map((s, i) => (
              <span key={i} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium shadow">{s}</span>
            )) : <div className="text-gray-400 italic">No skills</div>}
          </div>
        </div>
        {/* Right: Projects, Education, Experience */}
        <div className="flex-1 flex flex-col gap-8">
          {/* Projects */}
          <div>
            <h4 className="text-2xl font-bold text-blue-700 mb-3">Projects</h4>
            {Array.isArray(portfolio.projects) && portfolio.projects.filter(p => p.title).length > 0 ? (
              <ul className="space-y-3">
                {portfolio.projects.filter(p => p.title).map((p, i) => (
                  <li key={i} className="bg-blue-50 rounded-xl p-4 shadow flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div>
                      <div className="font-semibold text-lg">{p.title}</div>
                      <div className="text-sm text-gray-600">{p.description}</div>
                      {p.tech && <div className="text-xs text-blue-500 mt-1">Tech: {p.tech}</div>}
                    </div>
                    {p.link && <a href={p.link} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 underline ml-1">View</a>}
                  </li>
                ))}
              </ul>
            ) : <div className="text-gray-400 italic">No projects added</div>}
          </div>
          {/* Education */}
          <div>
            <h4 className="text-2xl font-bold text-blue-700 mb-3">Education</h4>
            {Array.isArray(portfolio.education) && portfolio.education.filter(e => e.degree).length > 0 ? (
              <ul className="space-y-3">
                {portfolio.education.filter(e => e.degree).map((e, i) => (
                  <li key={i} className="bg-blue-50 rounded-xl p-4 shadow">
                    <div className="font-semibold">{e.degree}</div>
                    <div className="text-sm text-gray-600">{e.school}</div>
                    {e.years && <div className="text-xs text-blue-500 mt-1">Years: {e.years}</div>}
                  </li>
                ))}
              </ul>
            ) : <div className="text-gray-400 italic">No education added</div>}
          </div>
          {/* Experience */}
          <div>
            <h4 className="text-2xl font-bold text-blue-700 mb-3">Experience</h4>
            {Array.isArray(portfolio.experience) && portfolio.experience.filter(e => e.role).length > 0 ? (
              <ul className="space-y-3">
                {portfolio.experience.filter(e => e.role).map((e, i) => (
                  <li key={i} className="bg-blue-50 rounded-xl p-4 shadow">
                    <div className="font-semibold">{e.role}</div>
                    <div className="text-sm text-gray-600">{e.company}</div>
                    {e.duration && <div className="text-xs text-blue-500 mt-1">Duration: {e.duration}</div>}
                    {e.description && <div className="text-xs text-gray-500 mt-1">{e.description}</div>}
                  </li>
                ))}
              </ul>
            ) : <div className="text-gray-400 italic">No experience added</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
