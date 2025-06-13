// src/components/ProfessionalSkillCircle.jsx
import React from 'react';
import { motion } from 'framer-motion';

const ProfessionalSkillCircle = ({ name, level }) => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (level / 100) * circumference;

  return (
    <motion.div
      className="flex flex-col items-center justify-center p-4"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="relative w-28 h-28 flex items-center justify-center">
        <svg className="w-full h-full" viewBox="0 0 120 120">
          {/* Background circle */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="#1E3A24" // Darker green for background
            strokeWidth="10"
            className="shadow-inner shadow-green-900/30"
          />
          {/* Progress circle */}
          <motion.circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="url(#gradient)" // Use gradient for stroke
            strokeWidth="10"
            strokeLinecap="round"
            transform="rotate(-90 60 60)" // Start from top
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset: offset }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ strokeDasharray: circumference }}
            className="drop-shadow-[0_0_10px_rgba(34,197,94,0.4)]"
          />
          {/* Gradient definition */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4ADE80" /> {/* Green */}
              <stop offset="100%" stopColor="#34D399" /> {/* Emerald */}
            </linearGradient>
          </defs>
        </svg>
        <span className="absolute text-2xl font-bold text-white">
          {level}%
        </span>
      </div>
      <p className="mt-3 text-lg font-semibold text-gray-200 text-center">{name}</p>
    </motion.div>
  );
};

export default ProfessionalSkillCircle;