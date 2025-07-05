import React from 'react';

export default function TemplateMinimal({ portfolio }) {
  const { personalInfo, projects, skills, education, experience } = portfolio;
  return (
    <div className="bg-white rounded-md shadow p-6 max-w-2xl mx-auto text-gray-800">
      <h2 className="text-2xl font-bold mb-1">{personalInfo?.name}</h2>
      <div className="text-base text-gray-500 mb-2">{personalInfo?.role}</div>
      <div className="mb-4 text-sm">{personalInfo?.summary}</div>
      <div className="flex flex-wrap gap-4 text-xs text-gray-400 mb-4">
        {personalInfo?.email && <span>Email: {personalInfo.email}</span>}
        {personalInfo?.phone && <span>Phone: {personalInfo.phone}</span>}
        {personalInfo?.location && <span>Location: {personalInfo.location}</span>}
      </div>
      <div className="mb-4">
        <span className="font-semibold">Skills:</span>
        <span className="ml-2">{skills?.map((skill, i) => skill.name).join(', ')}</span>
      </div>
      <div className="mb-4">
        <span className="font-semibold">Education:</span>
        <span className="ml-2">{education?.map((edu, i) => `${edu.degree} (${edu.school}${edu.years ? `, ${edu.years}` : ''})`).join('; ')}</span>
      </div>
      <div className="mb-4">
        <span className="font-semibold">Projects:</span>
        <ul className="list-disc ml-6 mt-1">
          {projects?.map((proj, i) => (
            <li key={i}>
              <span className="font-medium">{proj.title}</span>: {proj.description}
              {proj.tech && <span className="ml-1 text-xs text-gray-500">[{proj.tech}]</span>}
              {proj.link && <a href={proj.link} className="ml-1 text-indigo-500 underline text-xs" target="_blank" rel="noopener">{proj.link}</a>}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <span className="font-semibold">Work Experience:</span>
        <ul className="list-disc ml-6 mt-1">
          {experience?.map((exp, i) => (
            <li key={i}>
              <span className="font-medium">{exp.title}</span> at {exp.company}{exp.years ? ` (${exp.years})` : ''}: {exp.description}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
