import React from "react";

export default function PortfolioTemplateCard({ personalInfo, projects, skills, education, experience }) {
  return (
    <div className="rounded-2xl shadow-lg bg-white/95 p-8 border border-indigo-200">
      <h2 className="text-2xl font-bold text-indigo-600 mb-2">{personalInfo.name || 'Your Name'}</h2>
      <div className="mb-4 text-gray-700">{personalInfo.role}</div>
      <div className="mb-6 text-gray-500">{personalInfo.summary}</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold text-indigo-500 mb-2">Projects</h3>
          <ul className="space-y-2">
            {projects.map((p, i) => (
              <li key={i} className="bg-indigo-50 rounded p-3">
                <div className="font-bold">{p.title}</div>
                <div className="text-sm text-gray-600">{p.description}</div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-indigo-500 mb-2">Skills</h3>
          <ul className="flex flex-wrap gap-2">
            {skills.map((s, i) => (
              <li key={i} className="bg-indigo-100 px-3 py-1 rounded-full text-xs font-medium text-indigo-700">{s}</li>
            ))}
          </ul>
        </div>
      </div>
      {/* Add more sections as needed */}
    </div>
  );
}
