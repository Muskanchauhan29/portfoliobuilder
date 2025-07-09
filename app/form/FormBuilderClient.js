"use client";
import React, { useState, useEffect } from "react";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

import { TEMPLATES } from '@/components/templates';

const templateOptions = Object.entries(TEMPLATES).map(([key, val]) => ({ key, label: val.label }));

export default function FormBuilderClient({ themes = templateOptions, selectedTemplate, portfolio, updatePortfolio, resetPortfolio }) {

  const router = useRouter();

  // UI State
  const [activeSection, setActiveSection] = useState('personal');

  useEffect(() => {
    const savedSection = localStorage.getItem('portfolioActiveSection');
    if (savedSection) {
      setActiveSection(savedSection);
    }
  }, []);
  const [message, setMessage] = useState('');
  const [portfolioLink, setPortfolioLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    localStorage.setItem('portfolioActiveSection', activeSection);
  }, [activeSection]);

  const handleReset = () => {
    resetPortfolio();
    setMessage('Portfolio form has been reset.');
  };

  // Handlers
  const handlePersonalChange = (e) => {
    updatePortfolio(['personalInfo', e.target.name], e.target.value);
  };

  const handleAdd = (section) => {
    updatePortfolio(section, [...portfolio[section], {}]);
  };

  const handleRemove = (section, idx) => {
    updatePortfolio(section, portfolio[section].filter((_, i) => i !== idx));
  };

  const handleSectionChange = (section, idx, e) => {
    updatePortfolio([section, idx, e.target.name], e.target.value);
  };

  const handleSkillChange = (idx, value) => {
    updatePortfolio(['skills', idx], value);
  };

  const handleAddSkill = () => {
    updatePortfolio('skills', [...portfolio.skills, '']);
  };

  const handleRemoveSkill = (idx) => {
    updatePortfolio('skills', portfolio.skills.filter((_, i) => i !== idx));
  };

  const handleTemplateSelect = (key) => {
    updatePortfolio(['template'], key);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    try {
      localStorage.setItem('portfolioForm', JSON.stringify(portfolio));
      // Save to backend
      const res = await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(portfolio),
      });
      const data = await res.json();
      if (data.success && data.id) {
        setPortfolioLink(`/portfolio/${data.id}`);
        setMessage('Portfolio saved successfully!');
      } else {
        setError(data.error || 'Failed to save portfolio.');
      }
    } catch (err) {
      setError('Failed to save portfolio.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-blue-50 to-green-50 py-12 px-2">
      <div className="max-w-3xl mx-auto p-8 bg-white/90 rounded-2xl shadow-2xl border border-blue-100 backdrop-blur-md">
        <h2 className="text-3xl font-extrabold mb-8 text-center bg-gradient-to-r from-blue-500 via-pink-400 to-green-400 bg-clip-text text-transparent tracking-tight drop-shadow-lg">Build Your Portfolio</h2>
        {/* Section Navigation with Icons */}
        <div className="flex gap-3 mb-8 justify-center">
          <button title="Personal Info" className={`flex flex-col items-center px-4 py-2 rounded-xl transition-all ${activeSection === 'personal' ? 'bg-blue-100 text-blue-700 shadow' : 'bg-gray-100 text-gray-500 hover:bg-blue-50'}`} onClick={() => setActiveSection('personal')}>
            <span className="text-xl">👤</span>
            <span className="text-xs">Personal</span>
          </button>
          <button title="Projects" className={`flex flex-col items-center px-4 py-2 rounded-xl transition-all ${activeSection === 'projects' ? 'bg-pink-100 text-pink-700 shadow' : 'bg-gray-100 text-gray-500 hover:bg-pink-50'}`} onClick={() => setActiveSection('projects')}>
            <span className="text-xl">💡</span>
            <span className="text-xs">Projects</span>
          </button>
          <button title="Skills" className={`flex flex-col items-center px-4 py-2 rounded-xl transition-all ${activeSection === 'skills' ? 'bg-green-100 text-green-700 shadow' : 'bg-gray-100 text-gray-500 hover:bg-green-50'}`} onClick={() => setActiveSection('skills')}>
            <span className="text-xl">🛠️</span>
            <span className="text-xs">Skills</span>
          </button>
          <button title="Education" className={`flex flex-col items-center px-4 py-2 rounded-xl transition-all ${activeSection === 'education' ? 'bg-yellow-100 text-yellow-700 shadow' : 'bg-gray-100 text-gray-500 hover:bg-yellow-50'}`} onClick={() => setActiveSection('education')}>
            <span className="text-xl">🎓</span>
            <span className="text-xs">Education</span>
          </button>
          <button title="Experience" className={`flex flex-col items-center px-4 py-2 rounded-xl transition-all ${activeSection === 'experience' ? 'bg-purple-100 text-purple-700 shadow' : 'bg-gray-100 text-gray-500 hover:bg-purple-50'}`} onClick={() => setActiveSection('experience')}>
            <span className="text-xl">💼</span>
            <span className="text-xs">Experience</span>
          </button>
        </div>
        <form onSubmit={handleSave} className="space-y-6">
          {/* Personal Info */}
          {activeSection === 'personal' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input className="input-modern bg-white text-gray-900 placeholder-gray-400 font-poppins" name="name" placeholder="Name" value={portfolio.personalInfo.name || ''} onChange={handlePersonalChange} />
                <input className="input-modern bg-white text-gray-900 placeholder-gray-400 font-poppins" name="email" placeholder="Email" value={portfolio.personalInfo.email || ''} onChange={handlePersonalChange} />
                <input className="input-modern bg-white text-gray-900 placeholder-gray-400 font-poppins" name="phone" placeholder="Phone" value={portfolio.personalInfo.phone || ''} onChange={handlePersonalChange} />
                <input className="input-modern bg-white text-gray-900 placeholder-gray-400 font-poppins" name="location" placeholder="Location" value={portfolio.personalInfo.location || ''} onChange={handlePersonalChange} />
                <input className="input-modern bg-white text-gray-900 placeholder-gray-400 font-poppins" name="role" placeholder="Role (e.g. Frontend Developer)" value={portfolio.personalInfo.role || ''} onChange={handlePersonalChange} />
              </div>
              {/* Photo Upload */}
              <div className="flex flex-col md:flex-row items-center gap-4 mt-4">
                <label className="block text-sm font-medium text-gray-700">Upload Photo:</label>
                <input
                  type="file"
                  accept="image/*"
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  onChange={e => {
                    const file = e.target.files && e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = ev => {
                        updatePortfolio(['personalInfo', 'photo'], ev.target.result);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                {portfolio.personalInfo.photo && (
                  <Image src={portfolio.personalInfo.photo} alt="Preview" width={80} height={80} className="w-20 h-20 rounded-full object-cover shadow border" />
                )}
              </div>
              <textarea className="input-modern bg-white text-gray-900 placeholder-gray-400 font-poppins mt-4" name="summary" placeholder="Summary" value={portfolio.personalInfo.summary || ''} onChange={handlePersonalChange} />
            </motion.div>
          )}

          {/* Projects */}
          {activeSection === 'projects' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {portfolio.projects.map((project, idx) => (
                <div key={idx} className="mb-4 p-4 rounded bg-gray-50">
                  <input className="input-modern bg-white text-gray-900 placeholder-gray-400 font-poppins mb-2" name="title" placeholder="Project Title" value={project.title || ''} onChange={e => handleSectionChange('projects', idx, e)} />
                  <input className="input-modern bg-white text-gray-900 placeholder-gray-400 font-poppins mb-2" name="link" placeholder="Project Link" value={project.link || ''} onChange={e => handleSectionChange('projects', idx, e)} />
                  <textarea className="input-modern bg-white text-gray-900 placeholder-gray-400 font-poppins mb-2" name="description" placeholder="Description" value={project.description || ''} onChange={e => handleSectionChange('projects', idx, e)} />
                  <button type="button" className="text-red-500 text-sm" onClick={() => handleRemove('projects', idx)}>Remove</button>
                </div>
              ))}
              <button type="button" className="btn" onClick={() => handleAdd('projects')}>Add Project</button>
            </motion.div>
          )}

          {/* Skills */}
          {activeSection === 'skills' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {portfolio.skills.map((skill, idx) => (
                <div key={idx} className="flex gap-2 mb-2">
                  <input className="input-modern bg-white text-gray-900 placeholder-gray-400 font-poppins flex-1" placeholder="Skill" value={skill} onChange={e => handleSkillChange(idx, e.target.value)} />
                  <button type="button" className="text-red-500 text-sm" onClick={() => handleRemoveSkill(idx)}>Remove</button>
                </div>
              ))}
              <button type="button" className="btn" onClick={handleAddSkill}>Add Skill</button>
            </motion.div>
          )}

          {/* Education */}
          {activeSection === 'education' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {portfolio.education.map((edu, idx) => (
                <div key={idx} className="mb-4 p-4 rounded bg-gray-50">
                  <input className="input-modern bg-white text-gray-900 placeholder-gray-400 font-poppins mb-2" name="school" placeholder="School/College" value={edu.school || ''} onChange={e => handleSectionChange('education', idx, e)} />
                  <input className="input-modern bg-white text-gray-900 placeholder-gray-400 font-poppins mb-2" name="degree" placeholder="Degree" value={edu.degree || ''} onChange={e => handleSectionChange('education', idx, e)} />
                  <input className="input-modern bg-white text-gray-900 placeholder-gray-400 font-poppins mb-2" name="year" placeholder="Year" value={edu.year || ''} onChange={e => handleSectionChange('education', idx, e)} />
                  <button type="button" className="text-red-500 text-sm" onClick={() => handleRemove('education', idx)}>Remove</button>
                </div>
              ))}
              <button type="button" className="btn" onClick={() => handleAdd('education')}>Add Education</button>
            </motion.div>
          )}

          {/* Experience */}
          {activeSection === 'experience' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {portfolio.experience.map((exp, idx) => (
                <div key={idx} className="mb-4 p-4 rounded bg-gray-50">
                  <input className="input-modern bg-white text-gray-900 placeholder-gray-400 font-poppins mb-2" name="company" placeholder="Company" value={exp.company || ''} onChange={e => handleSectionChange('experience', idx, e)} />
                  <input className="input-modern bg-white text-gray-900 placeholder-gray-400 font-poppins mb-2" name="role" placeholder="Role" value={exp.role || ''} onChange={e => handleSectionChange('experience', idx, e)} />
                  <input className="input-modern bg-white text-gray-900 placeholder-gray-400 font-poppins mb-2" name="duration" placeholder="Duration" value={exp.duration || ''} onChange={e => handleSectionChange('experience', idx, e)} />
                  <textarea className="input-modern bg-white text-gray-900 placeholder-gray-400 font-poppins mb-2" name="description" placeholder="Description" value={exp.description || ''} onChange={e => handleSectionChange('experience', idx, e)} />
                  <button type="button" className="text-red-500 text-sm" onClick={() => handleRemove('experience', idx)}>Remove</button>
                </div>
              ))}
              <button type="button" className="btn" onClick={() => handleAdd('experience')}>Add Experience</button>
            </motion.div>
          )}

          <div className="mt-8 flex justify-center">
  <button
    type="submit"
    className={`flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 via-pink-400 to-green-400 text-white font-bold text-lg shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-2xl hover:from-blue-600 hover:to-green-500 focus:outline-none focus:ring-4 focus:ring-blue-200 ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
    disabled={loading}
  >
    {loading ? <span className="animate-spin">⏳</span> : <span className="text-xl">💾</span>}
    {loading ? 'Saving...' : 'Save Portfolio'}
  </button>
</div>
          {error && <div className="text-red-600 text-center mt-2">{error}</div>}
          {message && <div className="text-green-600 text-center mt-2">{message}{portfolioLink && (
            <div className="mt-2">
              <span>Your public portfolio: </span>
              <a href={portfolioLink} className="underline text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">{portfolioLink}</a>
            </div>
          )}</div>}
        </form>
        {/* Reset Button */}
        <div className="flex justify-end mt-8">
          <button
            type="button"
            onClick={() => {
              if (window.confirm('Are you sure you want to reset the form? All unsaved changes will be lost.')) {
                handleReset();
              }
            }}
            className="px-6 py-2 rounded-full bg-gradient-to-r from-red-400 to-pink-500 text-white font-semibold shadow hover:scale-105 transition-transform"
          >
            Reset Form
          </button>
        </div>
      </div>
    </div>
  );
}


// Tailwind utility classes
// .input-modern: px-4 py-2 rounded-xl border border-gray-300 w-full bg-white text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all text-base font-medium font-poppins
// Reminder: Add 'poppins' to tailwind.config.js theme.extend.fontFamily and import it in globals.css
// .btn: px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 transition font-semibold
