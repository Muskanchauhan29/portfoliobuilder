import React from "react";
import Image from 'next/image';

export default function PortfolioTemplateGrid({ personalInfo, projects, skills, education, experience }) {
  return (
    <div className="bg-gradient-to-br from-blue-50 via-green-50 to-yellow-50 p-8 rounded-2xl shadow-lg border border-blue-200">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 flex flex-col items-center">
          {personalInfo.photo && (
            <Image src={personalInfo.photo} alt="Profile" width={112} height={112} className="w-28 h-28 rounded-full mb-4 object-cover shadow" />
          )}
          <h2 className="text-xl font-bold text-blue-700 mb-1">{personalInfo.name || 'Your Name'}</h2>
          <div className="text-blue-500 mb-2">{personalInfo.role}</div>
        </div>
        <div className="md:col-span-2">
          <h3 className="font-semibold text-blue-500 mb-2">Projects</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {projects.map((p, i) => (
              <div key={i} className="bg-blue-100 rounded p-3">
                <div className="font-bold">{p.title}</div>
                <div className="text-sm text-gray-600">{p.description}</div>
              </div>
            ))}
          </div>
          <h3 className="font-semibold text-blue-500 mt-4 mb-2">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((s, i) => (
              <span key={i} className="bg-blue-200 px-2 py-1 rounded text-xs text-blue-800">{s}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
