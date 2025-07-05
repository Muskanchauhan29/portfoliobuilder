"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import { TEMPLATES } from '../../components/templates';
import { TEMPLATE_THUMBNAILS } from '../../components/TemplateThumbnails';

const svgVariants = {
  initial: { opacity: 0, y: 20, scale: 0.9 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: 'easeOut' } },
  hover: { scale: 1.04, filter: "drop-shadow(0 0 16px #a5b4fc)", transition: { type: 'spring', stiffness: 220 } },
};

const Thumbnail = ({ thumb }) => {
  // Always show SVG for a modern, never-missing look
  return (
    <motion.div
      className="rounded-2xl border-2 border-gradient-to-br from-purple-300 to-blue-200 shadow-xl bg-white/90 backdrop-blur-md flex items-center justify-center overflow-hidden mx-auto group-hover:shadow-2xl transition-all duration-300"
      style={{width: 220, height: 170, position: 'relative'}}
      initial="initial"
      animate="animate"
      whileHover="hover"
      variants={{
        initial: { opacity: 0, y: 30, scale: 0.95 },
        animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: 'easeOut' } },
        hover: { boxShadow: "0 8px 32px #a5b4fc55, 0 0 0 6px #c4b5fd33", scale: 1.03, transition: { type: 'spring', stiffness: 200 } },
      }}
    >
      <motion.div
        className="w-full h-full flex items-center justify-center"
        variants={svgVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
      >
        {thumb.svg}
      </motion.div>
      {/* Glossy highlight sweep on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{background: 'linear-gradient(120deg,rgba(255,255,255,0.14) 20%,rgba(255,255,255,0.01) 80%)'}}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1, transition: { duration: 0.4 } }}
        animate={{ opacity: 0 }}
      />
    </motion.div>
  );
};

const templateKeys = Object.keys(TEMPLATES);

const cardVariants = {
  rest: { scale: 1, rotateY: 0, boxShadow: "0 2px 16px rgba(80,0,120,0.08)", zIndex: 1 },
  hover: { scale: 1.03, rotateY: 8, boxShadow: "0 8px 32px rgba(80,0,120,0.16)", zIndex: 2 },
  tap: { scale: 0.97, rotateY: -6, boxShadow: "0 2px 16px rgba(80,0,120,0.12)", zIndex: 2 },
};
export default function TemplatesPage() {
  const router = useRouter();
  const [folded, setFolded] = useState(null);

  const handleSelect = (templateId) => {
    router.push(`/live-preview?template=${templateId}`);
  };

  const templateKeys = Object.keys(TEMPLATES);

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 bg-transparent flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-purple-500 via-pink-400 to-indigo-600 bg-clip-text text-transparent mb-4 drop-shadow-md">
        Choose Your Portfolio Template
      </h1>
      <p className="text-gray-700 mb-12 text-center max-w-xl">
        Select a template to start building your beautiful portfolio. All templates are fully customizable!
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 w-full max-w-6xl">
        {templateKeys.map((key) => {
          const thumb = TEMPLATE_THUMBNAILS[key];
          return (
            <motion.div
              key={key}
              className={`relative group rounded-3xl shadow-2xl overflow-visible cursor-pointer hover:ring-4 hover:ring-purple-200 transition-all bg-gradient-to-br ${thumb.bg}`}
              variants={cardVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              onClick={() => handleSelect(key)}
            >
              <div className="relative flex flex-col items-center justify-center p-6" style={{height: 340}}>
                <Thumbnail thumb={thumb} />
                <h2 className="mt-6 text-lg font-bold text-purple-700 text-center drop-shadow-sm">{thumb.label}</h2>
                <p className="text-xs text-gray-500 text-center mt-1">
                  {key === 'card' && 'Elegant glassmorphism, best for portfolios.'}
                  {key === 'modern' && 'Vibrant gradient, stylish and modern.'}
                  {key === 'grid' && 'Professional two-column resume style.'}
                  {key === 'elegant' && 'Soft pastel, for creative professionals.'}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
