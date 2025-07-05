// components/ElegantPortfolioCard.js
import React from 'react';

export default function ElegantPortfolioCard({ portfolio }) {
  const data = portfolio;
  if (!data) return null;
  return (
    <div className="relative mx-auto rounded-3xl shadow-2xl border border-pink-200 p-12 flex flex-col items-center max-w-5xl overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {typeof window !== 'undefined' && require('./ElegantPortfolioBackground').default()}
      </div>
      <div className="relative z-10 w-full flex flex-col items-center">
        <img src={data.personalInfo?.photo || ''} alt={data.personalInfo?.name || ''} className="w-28 h-28 rounded-full border-4 border-pink-400 shadow-lg mb-4 object-cover" />
        <h2 className="text-4xl font-extrabold text-pink-800 mb-1 text-center drop-shadow-lg">{data.personalInfo?.name || ''}</h2>
        <h3 className="text-2xl font-semibold text-purple-600 mb-3 text-center">{data.personalInfo?.role || ''}</h3>
        <p className="text-gray-700 mb-7 text-center max-w-2xl">{data.personalInfo?.summary || ''}</p>
        <h4 className="text-lg font-bold text-pink-700 mt-2 mb-1">Skills</h4>
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {Array.isArray(data.skills) && data.skills.filter(Boolean).length > 0 ? data.skills.filter(Boolean).map((s, i) => (
            <span key={i} className="bg-gradient-to-r from-pink-200 via-purple-100 to-blue-100 text-pink-900 px-4 py-2 rounded-full text-base font-semibold shadow">{s}</span>
          )) : <div className="text-gray-400 italic">No skills added</div>}
        </div>
        {/* Projects */}
        <div className="w-full mb-8">
          <h4 className="text-2xl font-bold text-pink-700 mb-3">Projects</h4>
          {Array.isArray(data.projects) && data.projects.filter(p => p.title).length > 0 ? (
            <ul className="space-y-3">
              {data.projects.filter(p => p.title).map((p, i) => (
                <li key={i} className="bg-pink-50 rounded-xl p-4 shadow flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div>
                    <div className="font-semibold text-lg">{p.title}</div>
                    <div className="text-sm text-gray-600">{p.description}</div>
                    {p.tech && <div className="text-xs text-pink-500 mt-1">Tech: {p.tech}</div>}
                  </div>
                  {p.link && <a href={p.link} target="_blank" rel="noopener noreferrer" className="text-xs text-pink-600 underline ml-1">View</a>}
                </li>
              ))}
            </ul>
          ) : <div className="text-gray-400 italic">No projects added</div>}
        </div>
        {/* Education */}
        <div className="w-full mb-8">
          <h4 className="text-2xl font-bold text-pink-700 mb-3">Education</h4>
          {Array.isArray(data.education) && data.education.filter(e => e.degree).length > 0 ? (
            <ul className="space-y-3">
              {data.education.filter(e => e.degree).map((e, i) => (
                <li key={i} className="bg-pink-50 rounded-xl p-4 shadow">
                  <div className="font-semibold">{e.degree}</div>
                  <div className="text-sm text-gray-600">{e.school}</div>
                  {e.years && <div className="text-xs text-pink-500 mt-1">Years: {e.years}</div>}
                </li>
              ))}
            </ul>
          ) : <div className="text-gray-400 italic">No education added</div>}
        </div>
        {/* Experience */}
        <div className="w-full mb-2">
          <h4 className="text-2xl font-bold text-pink-700 mb-3">Experience</h4>
          {Array.isArray(data.experience) && data.experience.filter(e => e.title).length > 0 ? (
            <ul className="space-y-3">
              {data.experience.filter(e => e.title).map((e, i) => (
                <li key={i} className="bg-pink-50 rounded-xl p-4 shadow">
                  <div className="font-semibold">{e.title}</div>
                  <div className="text-sm text-gray-600">{e.company}</div>
                  {e.years && <div className="text-xs text-pink-500 mt-1">Years: {e.years}</div>}
                  {e.description && <div className="text-xs text-gray-500 mt-1">{e.description}</div>}
                </li>
              ))}
            </ul>
          ) : <div className="text-gray-400 italic">No experience added</div>}
        </div>
      </div>
    </div>
  );
}
