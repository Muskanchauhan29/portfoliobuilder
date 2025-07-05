// components/PortfolioCard.js
"use client";
export default function PortfolioCard({ portfolio }) {
  const data = portfolio;
  if (!data) return null;
  return (
    <div className="relative mx-auto rounded-3xl bg-white/30 backdrop-blur-2xl border border-white/40 shadow-2xl p-8 md:p-12 flex flex-col items-center"
      style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)' }}>
      {/* Reflection effect */}
      <div className="absolute top-0 left-0 w-full h-1/4 pointer-events-none rounded-3xl"
        style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.23) 0%, rgba(255,255,255,0.06) 100%)', opacity: 0.7 }} />
      <img src={data.personalInfo?.photo || ''} alt={data.personalInfo?.name || ''} className="w-28 h-28 rounded-full border-4 border-white shadow-lg mb-4 object-cover" />
      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-1 text-center drop-shadow-lg">{data.personalInfo?.name || ''}</h2>
      <h3 className="text-xl md:text-2xl font-semibold text-indigo-600 mb-3 text-center">{data.personalInfo?.role || ''}</h3>
      <p className="text-gray-700 mb-5 text-center max-w-xl">{data.personalInfo?.summary || ''}</p>
      {/* Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-4">
        {/* Projects */}
        <div className="bg-white/60 rounded-2xl p-5 shadow-lg flex-1">
          <div className="flex items-center gap-2 mb-2"><span className="text-indigo-500 text-lg">📁</span><span className="font-bold">Projects</span></div>
          {Array.isArray(data.projects) && data.projects.length > 0 && data.projects[0]?.name ? data.projects.map((p, i) => (
            <div key={i} className="mb-2">
              <a href={p.link || '#'} className="text-indigo-700 font-semibold hover:underline transition-colors">{p.name}</a>
              <div className="text-sm text-gray-600">{p.desc}</div>
            </div>
          )) : <div className="text-gray-400 italic">No projects added</div>}
        </div>
        {/* Skills */}
        <div className="bg-white/60 rounded-2xl p-5 shadow-lg flex-1">
          <div className="flex items-center gap-2 mb-2"><span className="text-green-500 text-lg">🛠️</span><span className="font-bold">Skills</span></div>
          <div className="flex flex-wrap gap-2">
            {Array.isArray(data.skills) && data.skills.filter(Boolean).length > 0 ? data.skills.filter(Boolean).map((s, i) => (
              <span key={i} className="bg-gradient-to-r from-indigo-300 via-purple-200 to-pink-200 text-indigo-900 px-3 py-1 rounded-full text-sm font-semibold shadow">{s}</span>
            )) : <div className="text-gray-400 italic">No skills added</div>}
          </div>
        </div>
        {/* Education */}
        <div className="bg-white/60 rounded-2xl p-5 shadow-lg flex-1">
          <div className="flex items-center gap-2 mb-2"><span className="text-pink-500 text-lg">🎓</span><span className="font-bold">Education</span></div>
          {Array.isArray(data.education) && data.education.length > 0 && data.education[0]?.degree ? data.education.map((e, i) => (
            <div key={i} className="mb-1">
              <div className="font-semibold text-indigo-800">{e.degree}</div>
              <div className="text-sm text-gray-600">{e.school} ({e.year})</div>
            </div>
          )) : <div className="text-gray-400 italic">No education added</div>}
        </div>
        {/* Work Experience */}
        <div className="bg-white/60 rounded-2xl p-5 shadow-lg flex-1">
          <div className="flex items-center gap-2 mb-2"><span className="text-yellow-500 text-lg">💼</span><span className="font-bold">Work Experience</span></div>
          {Array.isArray(data.experience) && data.experience.length > 0 && data.experience[0]?.role ? data.experience.map((e, i) => (
            <div key={i} className="mb-1">
              <div className="font-semibold text-indigo-800">{e.role}</div>
              <div className="text-sm text-gray-600">{e.company} ({e.year})</div>
            </div>
          )) : <div className="text-gray-400 italic">No work experience added</div>}
        </div>
      </div>
    </div>
  );
}
