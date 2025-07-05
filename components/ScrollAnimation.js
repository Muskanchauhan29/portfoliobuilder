'use client';

import { motion } from 'framer-motion';

const ScrollAnimation = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollAnimation;
