import React from 'react';

export default function TemplateGrid({ portfolio }) {
  const { personalInfo, projects, skills, education, experience } = portfolio;
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h2 className="text-2xl font-bold text-indigo-800 mb-2">{personalInfo?.name}</h2>
        <div className="text-base text-gray-700 mb-1">{personalInfo?.role}</div>
        <div className="text-gray-500 mb-2">{personalInfo?.summary}</div>
        <div className="flex flex-wrap gap-3 text-xs text-gray-400 mb-6">
          {personalInfo?.email && <span>Email: {personalInfo.email}</span>}
          {personalInfo?.phone && <span>Phone: {personalInfo.phone}</span>}
          {personalInfo?.location && <span>Location: {personalInfo.location}</span>}
        </div>
        <h3 className="text-lg font-semibold text-indigo-600 mb-2">Skills</h3>
        <div className="flex flex-wrap gap-2 mb-6">
          {skills?.map((skill, i) => (
            <span key={i} className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-xs">{skill.name}</span>
          ))}
        </div>
        <h3 className="text-lg font-semibold text-indigo-600 mb-2">Education</h3>
        <div className="space-y-2 mb-6">
          {education?.map((edu, i) => (
            <div key={i}>
              <div className="font-medium">{edu.degree}</div>
              <div className="text-xs text-gray-500">{edu.school} {edu.years && <>• {edu.years}</>}</div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-indigo-600 mb-2">Projects</h3>
        <div className="space-y-4 mb-6">
          {projects?.map((proj, i) => (
            <div key={i} className="p-3 bg-indigo-50 rounded-lg">
              <h4 className="font-semibold">{proj.title}</h4>
              <div className="text-gray-600 text-sm">{proj.description}</div>
              <div className="flex flex-wrap gap-2 mt-1">
                {proj.tech && proj.tech.split(',').map((t, j) => (
                  <span key={j} className="bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full text-xs">{t.trim()}</span>
                ))}
              </div>
              {proj.link && <a href={proj.link} className="text-indigo-500 hover:underline text-xs ml-1" target="_blank" rel="noopener">{proj.link}</a>}
            </div>
          ))}
        </div>
        <h3 className="text-lg font-semibold text-indigo-600 mb-2">Work Experience</h3>
        <div className="space-y-2">
          {experience?.map((exp, i) => (
            <div key={i}>
              <div className="font-medium">{exp.title}</div>
              <div className="text-xs text-gray-500">{exp.company} {exp.years && <>• {exp.years}</>}</div>
              <div className="text-gray-600 mt-1 text-sm">{exp.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
