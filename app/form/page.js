"use client";

import { useRouter, useSearchParams } from "next/navigation";
import FormBuilderClient from "./FormBuilderClient";
import { useEffect, useState } from "react";

export default function FormBuilderPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedTemplate = searchParams.get("template") || "";

  // --- Example: Add your state initialization here if needed ---
  const [formData, setFormData] = useState({
    personalInfo: { name: '', email: '', phone: '', location: '', role: '', summary: '', photo: '' },
    projects: [],
    skills: [],
    education: [],
    experience: [],
    template: ''
  });
  const [cloudStatus, setCloudStatus] = useState('idle');
  const [cloudId, setCloudId] = useState(null);

  // You can define your themes here or import as needed
  const themes = [
    { key: 'card', label: 'Card' },
    { key: 'grid', label: 'Grid' },
    { key: 'minimal', label: 'Minimalist' },
  ];

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('portfolioForm');
    if (saved) setFormData(JSON.parse(saved));
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('portfolioForm', JSON.stringify(formData));
  }, [formData]);

  // Template selector handler
  const handleTemplateSelect = (key) => {
    setFormData(prev => ({ ...prev, template: key }));
  };

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  // Handle photo upload
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      handleInputChange('personalInfo', 'photo', reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    handleInputChange('personalInfo', 'photo', '');
  };

  const handleAddItem = (section) => {
    let item = {};
    if (section === 'projects') item = { title: '', description: '', tech: '', link: '' };
    if (section === 'skills') item = { name: '', level: '' };
    if (section === 'education') item = { degree: '', school: '', years: '' };
    if (section === 'experience') item = { title: '', company: '', years: '', description: '' };
    setFormData(prev => ({
      ...prev,
      [section]: [...prev[section], item]
    }));
  };

  const handleRemoveItem = (section, index) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  const handleItemChange = (section, index, field, value) => {
    setFormData(prev => {
      const updated = [...prev[section]];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, [section]: updated };
    });
  };

  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Build Your Portfolio</h1>

        {/* Template Selector */}
        <div className="mb-8">
          <div className="flex gap-4">
            {templateOptions.map(opt => (
              <button
                key={opt.key}
                onClick={() => handleTemplateSelect(opt.key)}
                className={`px-6 py-2 rounded-lg font-semibold shadow transition-colors border-2 ${formData.template === opt.key ? 'bg-indigo-600 text-white border-indigo-700' : 'bg-white text-indigo-700 border-indigo-200 hover:bg-indigo-50'}`}
              >
                {opt.label} Template
              </button>
            ))}
          </div>
          <div className="mt-2 text-sm text-gray-500">
            Selected: <span className="font-bold text-indigo-600">{templateOptions.find(t => t.key === formData.template)?.label}</span>
          </div>
        </div>

        {/* Preview & Save Buttons */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => router.push('/preview')}
            className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 shadow-lg transition-colors"
          >
            Preview Portfolio
          </button>
          <button
            onClick={async () => {
              setCloudStatus('loading');
              try {
                const res = await fetch('/api/portfolio', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(formData),
                });
                const data = await res.json();
                if (data.success) {
                  setCloudStatus('success');
                  setCloudId(data.id);
                } else {
                  setCloudStatus('error');
                  setCloudId(null);
                }
              } catch (e) {
                setCloudStatus('error');
              }
            }}
            className="px-6 py-3 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 shadow-lg transition-colors"
          >
            Save to Cloud
          </button>
        </div>
        {cloudStatus === 'loading' && <div className="mb-4 text-blue-600">Saving...</div>}
        {cloudStatus === 'success' && (
          <div className="mb-4 text-green-600">
            Portfolio saved to cloud!<br/>
            {cloudId && (
              <div className="mt-2 flex items-center gap-2">
                <span>Your portfolio link:</span>
                <a
                  href={`/portfolio/${cloudId}`}
                  className="text-blue-600 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {`${window.location.origin}/portfolio/${cloudId}`}
                </a>
                <button
                  className="ml-2 px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
                  onClick={() => {
                    navigator.clipboard.writeText(`${window.location.origin}/portfolio/${cloudId}`);
                  }}
                >
                  Copy Link
                </button>
              </div>
            )}
          </div>
        )}
        {cloudStatus === 'error' && <div className="mb-4 text-red-600">Error saving portfolio. Please try again.</div>}

        {/* Profile Photo Upload */}
        <div className="flex flex-col items-center mb-6">
          <label className="block mb-2 text-lg font-semibold text-gray-800">Profile Photo</label>
          {formData.personalInfo.photo ? (
            <div className="relative group">
              <img src={formData.personalInfo.photo} alt="Profile Preview" className="w-28 h-28 rounded-full object-cover shadow-xl ring-4 ring-indigo-200 transition-transform duration-500 group-hover:scale-105" />
              <button type="button" onClick={handleRemovePhoto} className="absolute top-1 right-1 bg-white/80 text-red-500 rounded-full p-1 shadow hover:bg-red-100 transition-colors" title="Remove photo">
                &times;
              </button>
            </div>
          ) : (
            <label className="w-28 h-28 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-400 cursor-pointer shadow-inner hover:bg-indigo-200 transition-colors">
              <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
              <span className="text-4xl">+</span>
            </label>
          )}
        </div>

        {/* Personal Info Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                value={formData.personalInfo.name}
                onChange={(e) => handleInputChange('personalInfo', 'name', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={formData.personalInfo.email}
                onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="text"
                value={formData.personalInfo.phone}
                onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                value={formData.personalInfo.location}
                onChange={(e) => handleInputChange('personalInfo', 'location', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Role/Headline</label>
              <input
                type="text"
                value={formData.personalInfo.role}
                onChange={(e) => handleInputChange('personalInfo', 'role', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Summary</label>
              <textarea
                value={formData.personalInfo.summary}
                onChange={(e) => handleInputChange('personalInfo', 'summary', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                rows={3}
              />
            </div>
          </div>
        </motion.div>

        {/* Projects Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Projects</h2>
            <button
              onClick={() => handleAddItem('projects')}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              Add Project
            </button>
          </div>
          <div className="space-y-4">
            {formData.projects.map((project, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Project {index + 1}</h3>
                  <button
                    onClick={() => handleRemoveItem('projects', index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input type="text" value={project.title} onChange={e => handleItemChange('projects', index, 'title', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Tech Stack</label>
                    <input type="text" value={project.tech} onChange={e => handleItemChange('projects', index, 'tech', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea value={project.description} onChange={e => handleItemChange('projects', index, 'description', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" rows={2} />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Project Link</label>
                    <input type="text" value={project.link} onChange={e => handleItemChange('projects', index, 'link', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Skills Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Skills</h2>
            <button
              onClick={() => handleAddItem('skills')}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              Add Skill
            </button>
          </div>
          <div className="space-y-4">
            {formData.skills.map((skill, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Skill {index + 1}</h3>
                  <button
                    onClick={() => handleRemoveItem('skills', index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Skill Name</label>
                    <input type="text" value={skill.name} onChange={e => handleItemChange('skills', index, 'name', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Level</label>
                    <input type="text" value={skill.level} onChange={e => handleItemChange('skills', index, 'level', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" placeholder="e.g. Beginner, Intermediate, Expert" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Education Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Education</h2>
            <button
              onClick={() => handleAddItem('education')}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              Add Education
            </button>
          </div>
          <div className="space-y-4">
            {formData.education.map((edu, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Education {index + 1}</h3>
                  <button
                    onClick={() => handleRemoveItem('education', index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Degree</label>
                    <input type="text" value={edu.degree} onChange={e => handleItemChange('education', index, 'degree', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">School</label>
                    <input type="text" value={edu.school} onChange={e => handleItemChange('education', index, 'school', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Years</label>
                    <input type="text" value={edu.years} onChange={e => handleItemChange('education', index, 'years', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" placeholder="e.g. 2018-2022" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Work Experience Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Work Experience</h2>
            <button
              onClick={() => handleAddItem('experience')}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              Add Experience
            </button>
          </div>
          <div className="space-y-4">
            {formData.experience.map((exp, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Experience {index + 1}</h3>
                  <button
                    onClick={() => handleRemoveItem('experience', index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input type="text" value={exp.title} onChange={e => handleItemChange('experience', index, 'title', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Company</label>
                    <input type="text" value={exp.company} onChange={e => handleItemChange('experience', index, 'company', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Years</label>
                    <input type="text" value={exp.years} onChange={e => handleItemChange('experience', index, 'years', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" placeholder="e.g. 2022-Present" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea value={exp.description} onChange={e => handleItemChange('experience', index, 'description', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" rows={2} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </main>
    </>
  );
}
