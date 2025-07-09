"use client";
import React from "react";
import PortfolioNavbar from "@/components/PortfolioNavbar";
import ContactInfoRow from "@/components/ContactInfoRow";
import dynamic from "next/dynamic";
const FadeInWhenVisible = dynamic(() => import("@/components/FadeInWhenVisible"), { ssr: false });
import TypewriterText from '@/components/TypewriterText';
import { motion } from 'framer-motion';
import ContactForm from '@/components/ContactForm';
import Image from 'next/image';

export default function PortfolioClient({ personalInfo = {}, projects = [], skills = [], education = [], experience = [], ownerId }) {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-50 text-gray-900 overflow-x-hidden">
      {/* Animated Blurred Background Shapes */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-gradient-to-br from-indigo-400 via-purple-300 to-pink-300 opacity-30 rounded-full blur-3xl animate-[blob_18s_ease-in-out_infinite]" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[500px] h-[500px] bg-gradient-to-tr from-pink-300 via-yellow-200 to-indigo-200 opacity-30 rounded-full blur-3xl animate-[blob2_22s_ease-in-out_infinite]" />
        {/* Floating dots/particles for extra polish */}
        <div className="absolute inset-0 z-10">
          {[...Array(24)].map((_,i)=>(
            <span key={i} className={`absolute rounded-full bg-indigo-200 opacity-30 animate-float-dot`} style={{
              width: `${8+Math.random()*12}px`,
              height: `${8+Math.random()*12}px`,
              left: `${Math.random()*100}%`,
              top: `${Math.random()*100}%`,
              animationDelay: `${Math.random()*10}s`,
              filter: 'blur(1px)'
            }} />
          ))}
        </div>
        <style>{`
          @keyframes blob {
            0%,100% { transform: scale(1) translate(0,0); }
            33% { transform: scale(1.1) translate(30px, -20px); }
            66% { transform: scale(0.95) translate(-20px, 40px); }
          }
          @keyframes blob2 {
            0%,100% { transform: scale(1) translate(0,0); }
            40% { transform: scale(1.08) translate(-40px, 25px); }
            70% { transform: scale(0.92) translate(40px, -30px); }
          }
          @keyframes float-dot {
            0% { transform: translateY(0) scale(1); opacity: .3; }
            50% { transform: translateY(-25px) scale(1.1); opacity: .5; }
            100% { transform: translateY(0) scale(1); opacity: .3; }
          }
          .animate-float-dot {
            animation: float-dot 8s ease-in-out infinite;
          }
        `}</style>
      </div>
      {/* Sticky Navbar */}
      <PortfolioNavbar />
      {/* --- Hero Section --- */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-[60vh] pt-10 pb-16 text-center">
        {/* Profile Photo */}
        {personalInfo.photo && (
          <div className="relative mb-6 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <span className="absolute -inset-3 rounded-full bg-gradient-to-tr from-purple-400 via-indigo-300 to-pink-300 blur-xl opacity-60 animate-blob2"></span>
            <Image
              src={personalInfo.photo}
              alt="Profile"
              width={192}
              height={192}
              className="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover shadow-2xl border-4 border-white ring-4 ring-purple-300/60 hover:ring-indigo-400 transition-all duration-700 z-10 relative animate-fade-in"
              style={{boxShadow: '0 8px 32px 0 rgba(99,102,241,0.22)'}}
            />
          </div>
        )}
        <h1 className="text-5xl md:text-6xl font-extrabold mb-2 bg-gradient-to-r from-indigo-600 to-purple-500 text-transparent bg-clip-text drop-shadow-lg animate-fade-in">
          {personalInfo.name || 'Your Name'}
        </h1>
        <div className="text-2xl md:text-3xl font-semibold text-indigo-700 mb-4 animate-fade-in delay-100 min-h-[40px]">
          {personalInfo.role || (personalInfo.skills && personalInfo.skills.length > 0 ? (
            <TypewriterText words={personalInfo.skills.map(skill => typeof skill === 'string' ? skill : skill.name || skill)} speed={80} pause={1200} className="inline-block bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent" />
          ) : 'Your Role')}
        </div>
        <p className="text-gray-700 mb-4 text-lg animate-fade-in delay-200 max-w-2xl mx-auto">
          {personalInfo.summary || 'A short summary about yourself goes here.'}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6 animate-fade-in delay-300">
          <a href="#contact-alt" className="inline-block px-7 py-3 rounded-full bg-gradient-to-r from-purple-400 via-indigo-400 to-pink-400 text-white font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300">
            Get In Touch
          </a>
          {personalInfo.resume && (
            <a href={personalInfo.resume} download className="inline-block px-7 py-3 rounded-full bg-white text-indigo-700 font-semibold border border-indigo-200 shadow hover:bg-indigo-50 hover:scale-105 transition-transform duration-300">
              Download Resume
            </a>
          )}
        </div>
        {/* Social Icons Row */}
        <div className="flex justify-center gap-5 mt-6 animate-fade-in delay-400">
          {personalInfo.github && (
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform" title="GitHub">
              <svg className="w-7 h-7 text-gray-700 hover:text-purple-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.425 2.867 8.18 6.839 9.504.5.091.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.529 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.339-2.221-.253-4.555-1.112-4.555-4.951 0-1.093.39-1.987 1.029-2.686-.103-.254-.446-1.274.098-2.656 0 0 .84-.27 2.75 1.025A9.563 9.563 0 0112 6.844c.85.004 1.705.115 2.504.338 1.909-1.295 2.748-1.025 2.748-1.025.546 1.382.203 2.402.1 2.656.64.699 1.028 1.593 1.028 2.686 0 3.849-2.337 4.695-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.417-.012 2.747 0 .267.18.577.688.479C19.135 20.197 22 16.444 22 12.021 22 6.484 17.523 2 12 2z"/></svg>
            </a>
          )}
          {personalInfo.linkedin && (
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform" title="LinkedIn">
              <svg className="w-7 h-7 text-blue-700 hover:text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.785-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.871-3.063-1.872 0-2.159 1.46-2.159 2.968v5.699h-3v-10h2.881v1.367h.041c.401-.761 1.381-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.601v5.595z"/>
              </svg>
            </a>
          )}
          {personalInfo.twitter && (
            <a href={personalInfo.twitter} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform" title="Twitter">
              <svg className="w-7 h-7 text-sky-500 hover:text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557a9.83 9.83 0 01-2.828.775 4.932 4.932 0 002.165-2.724c-.951.564-2.005.974-3.127 1.195a4.916 4.916 0 00-8.38 4.482C7.691 8.095 4.066 6.13 1.64 3.161c-.542.93-.856 2.01-.857 3.17 0 2.188 1.115 4.116 2.813 5.247a4.904 4.904 0 01-2.229-.616c-.054 2.28 1.581 4.415 3.949 4.89a4.936 4.936 0 01-2.224.084c.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 010 21.543a13.94 13.94 0 007.548 2.209c9.142 0 14.307-7.721 13.995-14.646A9.936 9.936 0 0024 4.557z"/>
              </svg>
            </a>
          )}
          {personalInfo.instagram && (
            <a href={personalInfo.instagram} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform" title="Instagram">
              <svg className="w-7 h-7 text-pink-500 hover:text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5a5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5a3.75 3.75 0 0 0 0-7.5zm6 1.25a1 1 0 1 1-2 0a1 1 0 0 1 2 0z"/>
              </svg>
            </a>
          )}
          {personalInfo.behance && (
            <a href={personalInfo.behance} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform" title="Behance">
              <svg className="w-7 h-7 text-blue-500 hover:text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7.802 11.318s.472-.36.472-1.045c0-.684-.43-1.06-1.25-1.06H2.001v6.573h5.26c.889 0 2.093-.272 2.093-1.866c0-1.595-1.188-1.775-1.552-1.867zm-3.4-1.1h2.13c.31 0 .497.144.497.397c0 .252-.187.39-.497.39h-2.13zm2.13 3.537h-2.13v-1.183h2.13c.354 0 .563.166.563.56c0 .393-.209.623-.563.623zm11.018-2.437c-1.191 0-1.979.563-2.109 1.7h1.265c.044-.333.333-.534.844-.534c.482 0 .751.19.751.54v.229h-1.595c-1.492 0-2.102.693-2.102 1.42c0 .71.646 1.354 1.79 1.354c.708 0 1.191-.168 1.465-.513v.389h1.13v-2.166c0-1.22-.708-1.419-1.439-1.419zm-.12 2.295c0 .272-.25.507-.75.507c-.425 0-.675-.197-.675-.506c0-.322.25-.507.675-.507c.5 0 .75.185.75.506zM20.5 13.5h-3.5v-1h3.5v1zm-8.5-4V9h-3v1h3zm-3 3v1h3v-1h-3z"/>
              </svg>
            </a>
          )}
        </div>
      </section>

      {/* Glassy Card Container */}
      <div className="relative z-10 max-w-4xl mx-auto mt-10 mb-16 p-8 bg-white/80 rounded-3xl shadow-2xl border border-indigo-100 backdrop-blur-2xl">

        {/* --- Expertise Section --- */}
        <section id="expertise" className="mb-16">
          <h2 className="text-4xl font-extrabold text-center mb-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-transparent bg-clip-text">My Expertise</h2>
          <p className="text-center text-gray-700 mb-8">With a diverse skill set across multiple disciplines, I bring a unique perspective to every project.</p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-10">
            {/* 3D/Stacked Skill Cards Illustration (static for now) */}
            <div className="hidden md:block">
              <div className="relative w-48 h-48">
                <div className="absolute left-12 top-0 w-24 h-24 bg-purple-300 opacity-80 rotate-12 rounded-2xl shadow-xl" />
                <div className="absolute left-0 top-10 w-32 h-32 bg-indigo-300 opacity-70 -rotate-12 rounded-2xl shadow-lg" />
                <div className="absolute left-16 top-20 w-28 h-28 bg-pink-300 opacity-60 rotate-6 rounded-2xl shadow-lg" />
                <div className="absolute left-8 top-28 w-24 h-24 bg-yellow-200 opacity-60 -rotate-3 rounded-2xl shadow-md" />
              </div>
            </div>
            {/* Skills List */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
              {skills && skills.length > 0 ? skills.map((skill, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${skill.category === 'Full-Stack' ? 'bg-indigo-400' : skill.category === 'AI' ? 'bg-blue-400' : skill.category === 'DevOps' ? 'bg-pink-400' : skill.category === 'UI/UX' ? 'bg-purple-400' : skill.category === 'Automation' ? 'bg-yellow-300' : 'bg-gray-300'}`}></span>
                  <span className="font-medium text-gray-800">{typeof skill === 'string' ? skill : skill.name}</span>
                </div>
              )) : (
                <div className="col-span-2 text-gray-500">No skills added yet.</div>
              )}
            </div>
          </div>
        </section>
        {/* --- Work/Projects Section --- */}
        <section id="work" className="mb-16">
          <h2 className="text-4xl font-extrabold text-center mb-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-transparent bg-clip-text">My Work</h2>
          <p className="text-center text-gray-700 mb-8">Explore my projects across web, mobile, and digital platforms.</p>
          <div className="grid gap-8 md:grid-cols-2">
            {projects && projects.length > 0 ? projects.map((project, idx) => (
              <div key={idx} className="bg-white/90 rounded-2xl shadow-lg p-6 flex flex-col justify-between border border-indigo-50 hover:shadow-2xl transition-shadow">
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-indigo-700">{project.title}</h3>
                  <p className="text-gray-700 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {project.technologies && project.technologies.map((tech, tIdx) => (
                      <span key={tIdx} className="inline-block bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full text-xs font-medium">{tech}</span>
                    ))}
                  </div>
                </div>
                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block px-4 py-2 rounded-full bg-gradient-to-r from-purple-400 to-indigo-400 text-white font-semibold shadow hover:scale-105 transition-transform">View Project</a>
                )}
              </div>
            )) : (
              <div className="col-span-2 text-gray-500">No projects added yet.</div>
            )}
          </div>
        </section>
        {/* --- Education Section --- */}
        <section id="education" className="mb-16">
          <h2 className="text-4xl font-extrabold text-center mb-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-transparent bg-clip-text">Education</h2>
          <p className="text-center text-gray-700 mb-8">My academic background and certifications.</p>
          <div className="flex flex-col gap-6 items-center">
            {education && education.length > 0 ? education.map((edu, idx) => (
              <div key={idx} className="w-full max-w-xl bg-white/90 rounded-2xl shadow p-5 border border-indigo-50 flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-indigo-700">{edu.institution}</h3>
                  <p className="text-gray-700">{edu.degree} {edu.field && <span>- {edu.field}</span>}</p>
                  <p className="text-gray-500 text-sm">{edu.startYear} - {edu.endYear || 'Present'}</p>
                </div>
                {edu.logo && <Image src={edu.logo} alt="logo" width={64} height={64} className="w-16 h-16 object-contain rounded-xl" />}
              </div>
            )) : (
              <div className="text-gray-500">No education history added yet.</div>
            )}
          </div>
        </section>
        {/* --- Contact Section --- */}
        <section id="contact-alt" className="mb-16">
          <h2 className="text-4xl font-extrabold text-center mb-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-transparent bg-clip-text">Get In Touch</h2>
          <p className="text-center text-gray-700 mb-8">Have a project in mind or want to discuss potential opportunities? I&apos;d love to hear from you.</p>
          <div className="flex flex-col md:flex-row gap-8 items-start justify-center">
            {/* Contact Info Card */}
            <div className="flex-1 bg-white/90 rounded-2xl shadow p-6 mb-6 md:mb-0 border border-indigo-50 min-w-[270px]">
              <div className="flex items-center gap-3 mb-2"><span className="material-icons text-indigo-500">email</span><span>{personalInfo.email || 'your@email.com'}</span></div>
              {personalInfo.phone && <div className="flex items-center gap-3 mb-2"><span className="material-icons text-indigo-500">phone</span><span>{personalInfo.phone}</span></div>}
              {personalInfo.location && <div className="flex items-center gap-3 mb-2"><span className="material-icons text-indigo-500">location_on</span><span>{personalInfo.location}</span></div>}
              <div className="mt-4">
                <div className="font-semibold mb-2">Professional Profiles</div>
                <div className="flex gap-2 flex-wrap">
                  {personalInfo.linkedin && <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="inline-block px-3 py-1 bg-indigo-100 rounded-full font-medium text-indigo-700">LinkedIn</a>}
                  {personalInfo.github && <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="inline-block px-3 py-1 bg-indigo-100 rounded-full font-medium text-indigo-700">GitHub</a>}
                  {personalInfo.behance && <a href={personalInfo.behance} target="_blank" rel="noopener noreferrer" className="inline-block px-3 py-1 bg-indigo-100 rounded-full font-medium text-indigo-700">Behance</a>}
                  {personalInfo.instagram && <a href={personalInfo.instagram} target="_blank" rel="noopener noreferrer" className="inline-block px-3 py-1 bg-indigo-100 rounded-full font-medium text-indigo-700">Instagram</a>}
                </div>
              </div>
            </div>
            {/* Contact Form */}
            <form className="flex-1 bg-white/90 rounded-2xl shadow p-6 border border-indigo-50 w-full max-w-md mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input type="text" name="name" className="w-full px-3 py-2 rounded-lg border border-indigo-100 focus:ring-indigo-400 focus:border-indigo-400 outline-none" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" name="email" className="w-full px-3 py-2 rounded-lg border border-indigo-100 focus:ring-indigo-400 focus:border-indigo-400 outline-none" required />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input type="text" name="subject" className="w-full px-3 py-2 rounded-lg border border-indigo-100 focus:ring-indigo-400 focus:border-indigo-400 outline-none" required />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea name="message" rows={4} className="w-full px-3 py-2 rounded-lg border border-indigo-100 focus:ring-indigo-400 focus:border-indigo-400 outline-none" required></textarea>
              </div>
              <button type="submit" className="w-full py-3 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold shadow-lg hover:scale-105 transition-transform">Send Message</button>
            </form>
          </div>
        </section>
        {/* Removed duplicate Hero/About Section - now only the top hero section remains */}
        {/* --- Footer --- */}
        <footer className="flex justify-center mt-10">
          <div className="bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 w-full max-w-4xl">
            <div className="flex justify-between items-center mb-4">
              <p className="text-gray-700 text-lg">Built with Next.js and Tailwind CSS</p>
              <a href={`mailto:${personalInfo.email}`} className="text-indigo-700 hover:text-indigo-900 transition-colors duration-200">Get in touch</a>
            </div>
            <p className="text-gray-700 text-lg">Copyright 2023 Your Name. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
