// src/components/TechnicalSkillBar.jsx
import React from 'react';
import { motion } from 'framer-motion';
// Cần cài đặt: npm install react-icons
import { FaHtml5, FaCss3Alt, FaJs, FaPython, FaReact } from 'react-icons/fa';

const iconMap = {
  html: FaHtml5,
  css: FaCss3Alt,
  javascript: FaJs,
  python: FaPython,
  react: FaReact,
};

const TechnicalSkillBar = ({ name, icon, level }) => {
  const IconComponent = iconMap[icon] || null; // Fallback nếu không có icon

  return (
    <motion.div
      className="mb-4"
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="flex items-center justify-between text-gray-200 mb-1">
        <span className="flex items-center gap-2 text-lg font-medium">
          {IconComponent && <IconComponent className="w-5 h-5 text-green-400" />}
          {name}
        </span>
        <span className="text-sm font-semibold text-emerald-300">{level}%</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2.5">
        <motion.div
          className="bg-gradient-to-r from-green-500 to-emerald-500 h-2.5 rounded-full shadow-md shadow-green-700/30"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{ willChange: 'width' }} // Optimize for animation
        />
      </div>
    </motion.div>
  );
};

export default TechnicalSkillBar;