import React from 'react';

export default function TemplateCard({ portfolio }) {
  const { personalInfo, projects, skills, education, experience } = portfolio;
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:gap-8 mb-8">
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-indigo-700 mb-1">{personalInfo?.name}</h2>
          <div className="text-lg text-gray-600 mb-1">{personalInfo?.role}</div>
          <div className="text-gray-500 mb-2">{personalInfo?.summary}</div>
          <div className="flex flex-wrap gap-4 text-sm text-gray-400">
            {personalInfo?.email && <span>Email: {personalInfo.email}</span>}
            {personalInfo?.phone && <span>Phone: {personalInfo.phone}</span>}
            {personalInfo?.location && <span>Location: {personalInfo.location}</span>}
          </div>
        </div>
      </div>
      <hr className="my-6" />
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-indigo-600 mb-3">Projects</h3>
        <div className="space-y-4">
          {projects?.map((proj, i) => (
            <div key={i} className="p-4 bg-indigo-50 rounded-lg">
              <h4 className="font-semibold">{proj.title}</h4>
              <div className="text-gray-600">{proj.description}</div>
              <div className="flex flex-wrap gap-2 mt-1">
                {proj.tech && proj.tech.split(',').map((t, j) => (
                  <span key={j} className="bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full text-xs">{t.trim()}</span>
                ))}
              </div>
              {proj.link && <a href={proj.link} className="text-indigo-500 hover:underline text-xs ml-1" target="_blank" rel="noopener">{proj.link}</a>}
            </div>
          ))}
        </div>
      </div>
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-indigo-600 mb-3">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {skills?.map((skill, i) => (
            <span key={i} className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">{skill.name}</span>
          ))}
        </div>
      </div>
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-indigo-600 mb-3">Education</h3>
        <div className="space-y-2">
          {education?.map((edu, i) => (
            <div key={i}>
              <div className="font-medium">{edu.degree}</div>
              <div className="text-xs text-gray-500">{edu.school} {edu.years && <>• {edu.years}</>}</div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-xl font-semibold text-indigo-600 mb-3">Work Experience</h3>
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
