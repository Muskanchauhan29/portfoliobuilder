'use client';

import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import TemplateGallery from '@/components/TemplateGallery';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaLinkedin } from 'react-icons/fa';

const containerVariants = {
  offscreen: {},
  onscreen: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  offscreen: {
    opacity: 0,
    y: 30,
  },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      bounce: 0.4,
      duration: 0.8,
    },
  },
};


// Hero Section
const Hero = () => (
  <section className="relative pt-32 pb-20 text-center">
    <div className="container mx-auto px-4">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tighter mb-6 text-gray-900"
      >
        Your Portfolio, Your Story – <br />
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-700">Built within Minutes!</span>
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-8"
      >
        Showcase your creativity effortlessly with stunning, customizable templates, a drag-and-drop interface, and powerful tools to make your talent shine.
      </motion.p>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="flex justify-center space-x-4"
      >
        <Link href="/templates" className="px-8 py-3 rounded-lg bg-gray-900 text-white font-semibold hover:bg-gray-800 transition-colors shadow-lg">
          Get Started
        </Link>
        <Link href="#" className="px-8 py-3 rounded-lg bg-white/50 backdrop-blur-sm border border-gray-300 text-gray-800 font-semibold hover:bg-white/80 transition-colors shadow-lg">
          Learn More
        </Link>
      </motion.div>
    </div>
  </section>
);

// Features Section
const Features = () => (
  <section className="py-10 md:py-16">
    <div className="container mx-auto px-4">
      <div className="bg-white/40 backdrop-blur-md rounded-3xl shadow-xl p-8 md:p-12">
        <h2 className="text-4xl font-bold mb-4 text-center text-gray-900">Features</h2>
        <p className="text-gray-700 mb-12 max-w-2xl mx-auto text-center">Discover the powerful features that make Portfolio Builder the best choice for creating your professional online presence.</p>
        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.div variants={cardVariants} className="p-8 bg-white/60 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold mb-2 text-gray-900">Customizable Templates</h3>
            <p className="text-gray-700">Choose from a variety of professionally designed templates and customize them to fit your style.</p>
          </motion.div>
          <motion.div variants={cardVariants} className="p-8 bg-white/60 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold mb-2 text-gray-900">Drag-and-Drop Editor</h3>
            <p className="text-gray-700">Easily build and edit your portfolio with our intuitive drag-and-drop interface.</p>
          </motion.div>
          <motion.div variants={cardVariants} className="p-8 bg-white/60 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold mb-2 text-gray-900">Responsive Design</h3>
            <p className="text-gray-700">Your portfolio will look stunning on any device, from desktops to smartphones.</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  </section>
);

// Templates Section
const Templates = () => {
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState('card');

  const handleSelectTemplate = (templateKey) => {
    setSelectedTemplate(templateKey);
    router.push(`/live-preview?template=${templateKey}`);
  };

  return (
  <section className="py-10 md:py-16">
    <div className="container mx-auto px-4">
      <div className="bg-white/40 backdrop-blur-md rounded-3xl shadow-xl p-8 md:p-12">
        <h2 className="text-4xl font-bold mb-4 text-center text-gray-900">Stunning Templates</h2>
        <p className="text-gray-700 mb-12 max-w-2xl mx-auto text-center">Get started with a professionally designed template. Each one is fully customizable.</p>
        <TemplateGallery selected={selectedTemplate} onSelect={handleSelectTemplate} />
      </div>
    </div>
  </section>
  );
}

// How It Works Section
const HowItWorks = () => (
  <section id="howitworks" className="py-10 md:py-16 bg-gradient-to-br from-white via-purple-50 to-pink-50">
    <div className="container mx-auto px-4">
      <div className="bg-white/60 backdrop-blur-md rounded-3xl shadow-xl p-8 md:p-12">
        <h2 className="text-4xl font-bold mb-8 text-center text-gray-900">How It Works</h2>
        <motion.div
          className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto"
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.div variants={cardVariants} className="bg-white/80 border border-purple-200 rounded-2xl p-8 flex flex-col items-center shadow-lg">
            <div className="bg-purple-100 text-purple-600 rounded-full p-4 mb-4">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900">1. Choose a Template</h3>
            <p className="text-gray-700 text-center">Browse our collection of stunning templates designed for every profession and style.</p>
          </motion.div>
          <motion.div variants={cardVariants} className="bg-white/80 border border-pink-200 rounded-2xl p-8 flex flex-col items-center shadow-lg">
            <div className="bg-pink-100 text-pink-600 rounded-full p-4 mb-4">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20l9-5-9-5-9 5 9 5zm0-10V4m0 0L3 9m9-5l9 5" /></svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900">2. Customize Your Portfolio</h3>
            <p className="text-gray-700 text-center">Easily add your projects, experience, and personal brand. No coding required!</p>
          </motion.div>
          <motion.div variants={cardVariants} className="bg-white/80 border border-indigo-200 rounded-2xl p-8 flex flex-col items-center shadow-lg">
            <div className="bg-indigo-100 text-indigo-600 rounded-full p-4 mb-4">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900">3. Share Your Work</h3>
            <p className="text-gray-700 text-center">Publish your portfolio and share your unique link with employers, clients, or friends.</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  </section>
);


// Footer
const Footer = () => (
  <footer className="relative mt-24 overflow-hidden">
  {/* Animated gradient background blobs */}
  <div className="absolute -top-16 -left-16 w-96 h-96 bg-gradient-to-br from-purple-300 via-pink-200 to-indigo-200 rounded-full blur-3xl opacity-60 animate-blob z-0" />
  <div className="absolute -bottom-20 right-0 w-80 h-80 bg-gradient-to-tr from-indigo-200 via-purple-100 to-pink-200 rounded-full blur-3xl opacity-50 animate-blob2 z-0" />
    {/* Soft top gradient for separation */}
    <div className="absolute top-0 left-0 w-full h-6 bg-gradient-to-t from-white/80 to-transparent pointer-events-none z-10" />
    <div className="relative z-20 max-w-7xl mx-auto px-6 py-14">
      <div className="bg-white/70 backdrop-blur-2xl border border-white/30 shadow-2xl rounded-3xl p-10 md:p-16 flex flex-col lg:flex-row gap-12 lg:gap-20">
        {/* Branding */}
        <div className="flex-1 min-w-[220px]">
          <h2 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-400 to-indigo-600 drop-shadow-sm">
            Portfolio Builder
          </h2>
          <p className="text-gray-700 mt-3 text-base font-medium">
            Build your story, beautifully.
          </p>
        </div>

        {/* Links */}
        {/* Navigation Columns */}
        <div className="flex-[2] grid grid-cols-2 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-gray-900 tracking-wide mb-4">Product</h3>
            <ul className="space-y-2">
              <li><Link href="#features" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">Features</Link></li>
              <li><Link href="#templates" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">Templates</Link></li>
              <li><Link href="#howitworks" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">How It Works</Link></li>
              <li><Link href="/form" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">Get Started</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 tracking-wide mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">Careers</a></li>
              <li><Link href="/contact" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 tracking-wide mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        {/* Socials */}
        <div className="flex flex-col items-start min-w-[160px]">
          <h3 className="font-bold text-gray-900 tracking-wide mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://www.linkedin.com/in/muskan-chauhan-615619280/" target="_blank" rel="noopener noreferrer" className="rounded-full p-2 bg-gradient-to-br from-blue-600 to-blue-400 text-white shadow-lg hover:scale-110 hover:from-blue-700 hover:to-blue-500 transition-transform">
              <FaLinkedin className="w-6 h-6" />
            </a>
            <a href="https://github.com/Muskanchauhan29" target="_blank" rel="noopener noreferrer" className="rounded-full p-2 bg-gradient-to-br from-sky-400 to-blue-600 text-white shadow-lg hover:scale-110 hover:from-blue-400 hover:to-purple-600 transition-transform">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
            </a>
            <a href="https://x.com/muskchauhan296" target="_blank" rel="noopener noreferrer" className="rounded-full p-2 bg-gradient-to-br from-gray-700 to-gray-900 text-white shadow-lg hover:scale-110 hover:from-indigo-500 hover:to-gray-700 transition-transform">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12.014c0 4.438 2.865 8.229 6.838 9.54.49.09.668-.213.668-.473 0-.234-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.446-1.13-1.09-1.43-1.09-1.43-.892-.61.067-.598.067-.598.986.069 1.506 1.013 1.506 1.013.875 1.5 2.291 1.066 2.85.815.088-.633.341-1.066.621-1.31-2.17-.247-4.455-1.087-4.455-4.827 0-1.066.379-1.938 1.01-2.62-.1-.247-.438-1.238.098-2.583 0 0 .82-.262 2.678 1.002a9.303 9.303 0 012.44-.328c.83.009 1.66.11 2.44.328 1.858-1.264 2.678-1.002 2.678-1.002.536 1.345.2 2.336.098 2.583.63.682 1.01 1.554 1.01 2.62 0 3.75-2.288 4.576-4.465 4.822.35.308.656.922.656 1.858v2.748c0 .26.18.56.67.47C19.135 20.243 22 16.452 22 12.014 22 6.477 17.523 2 12 2z" /></svg>
            </a>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-gray-200/20 pt-8 text-center">
        <p className="text-gray-300 text-sm">
          &copy; {new Date().getFullYear()} Portfolio Builder. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default function Home() {
  return (
    <main>
        <Hero />
        <Features />
        <Templates />
        <HowItWorks />
        <Footer />
    </main>
  );
}
