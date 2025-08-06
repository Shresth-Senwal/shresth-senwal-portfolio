import React from 'react';
import { motion } from 'framer-motion';

interface MetallicPaintProps {
  children: React.ReactNode;
  className?: string;
}

export const MetallicPaint: React.FC<MetallicPaintProps> = ({
  children,
  className = ''
}) => {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div
        className="relative z-10 font-bold bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600 bg-clip-text text-transparent"
        style={{
          backgroundImage: `
            linear-gradient(
              45deg,
              #c0c0c0 0%,
              #ffffff 20%,
              #c0c0c0 40%,
              #808080 60%,
              #ffffff 80%,
              #c0c0c0 100%
            )
          `,
          backgroundSize: '200% 100%',
          animation: 'shimmer 3s ease-in-out infinite',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {children}
      </div>
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.3), transparent)',
          transform: 'translateX(-100%)',
        }}
        animate={{
          transform: ['translateX(-100%)', 'translateX(100%)'],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 3,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
};