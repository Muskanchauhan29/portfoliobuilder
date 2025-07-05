import React from "react";

export default function PortfolioTemplateMinimal({ personalInfo, projects, skills, education, experience }) {
  return (
    <div className="bg-white/95 rounded-xl shadow p-8 border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-900 mb-1">{personalInfo.name || 'Your Name'}</h2>
      <div className="text-gray-600 mb-2">{personalInfo.role}</div>
      <div className="text-gray-400 mb-4">{personalInfo.summary}</div>
      <div className="mb-3">
        <span className="font-semibold">Skills:</span>
        <span className="ml-2 text-gray-700">{skills.join(', ')}</span>
      </div>
      <div>
        <span className="font-semibold">Projects:</span>
        <ul className="list-disc ml-6 mt-1 text-gray-600">
          {projects.map((p, i) => (
            <li key={i}>{p.title}: {p.description}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
