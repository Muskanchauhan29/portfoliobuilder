import React from 'react';

export default function TemplateCreative({ portfolio }) {
  const { personalInfo, projects = [], skills = [], education = [], experience = [] } = portfolio || {};
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-purple-900 via-pink-600 to-yellow-300 text-white p-8 flex flex-col items-center">
      {/* Starry/creative background */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-700 via-pink-400/30 to-transparent opacity-60 animate-pulse" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-yellow-200/40 via-pink-200/10 to-transparent opacity-70 animate-blob2" />
      </div>
      <div className="relative z-10 w-full max-w-3xl mx-auto mt-12 mb-12 p-8 rounded-3xl shadow-2xl bg-white/20 backdrop-blur-xl border border-white/30">
        <h1 className="text-5xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-700 drop-shadow mb-2">
          {personalInfo?.name || 'Your Name'}
        </h1>
        <h2 className="text-2xl text-center font-semibold text-white/90 mb-4">
          {personalInfo?.role || 'Your Role'}
        </h2>
        <p className="text-center text-lg text-white/80 mb-6">
          {personalInfo?.summary || 'A short summary about yourself goes here.'}
        </p>
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {skills?.map((s, i) => (
            <span key={i} className="px-4 py-1 rounded-full bg-pink-200/70 text-pink-800 font-semibold text-xs shadow">
              {s}
            </span>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold text-yellow-200 mb-2">Projects</h3>
            <ul className="space-y-2">
              {projects.map((p, i) => (
                <li key={i} className="bg-white/30 rounded-xl p-3 shadow border border-pink-100">
                  <div className="font-bold text-pink-100">{p.title}</div>
                  <div className="text-white/90 text-sm">{p.description}</div>
                  {p.link && (
                    <a href={p.link} target="_blank" rel="noopener noreferrer" className="text-yellow-200 underline text-xs">{p.link}</a>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold text-yellow-200 mb-2">Education</h3>
            <ul className="space-y-2">
              {education.map((edu, i) => (
                <li key={i} className="bg-white/20 rounded-xl p-3 shadow border border-yellow-100">
                  <div className="font-bold text-yellow-100">{edu.degree}</div>
                  <div className="text-white/80 text-sm">{edu.institution} {edu.year && <span>({edu.year})</span>}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold text-yellow-200 mb-2">Experience</h3>
          <ul className="space-y-2">
            {experience.map((exp, i) => (
              <li key={i} className="bg-white/10 rounded-xl p-3 shadow border border-purple-100">
                <div className="font-bold text-purple-100">{exp.title}</div>
                <div className="text-white/80 text-sm">{exp.company} {exp.years && <span>({exp.years})</span>}</div>
                <div className="text-white/70 text-xs">{exp.description}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
