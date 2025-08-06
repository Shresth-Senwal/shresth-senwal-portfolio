import React from 'react';
import { motion } from 'framer-motion';

interface StarBorderProps {
  children: React.ReactNode;
  className?: string;
}

export const StarBorder: React.FC<StarBorderProps> = ({
  children,
  className = ''
}) => {
  return (
    <motion.div
      className={`relative overflow-hidden rounded-lg ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Animated border */}
      <div className="absolute inset-0 rounded-lg p-[2px] bg-gradient-to-r from-portfolio-purple via-portfolio-cyan to-portfolio-green opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-full h-full bg-portfolio-bg rounded-lg" />
      </div>
      
      {/* Rotating gradient border */}
      <motion.div
        className="absolute inset-0 rounded-lg p-[1px]"
        style={{
          background: 'conic-gradient(from 0deg, transparent, hsl(var(--portfolio-purple)), transparent, hsl(var(--portfolio-cyan)), transparent, hsl(var(--portfolio-green)), transparent)',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      >
        <div className="w-full h-full bg-portfolio-bg rounded-lg" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 group">{children}</div>
      
      {/* Star particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${20 + i * 12}%`,
              top: `${15 + (i % 2) * 70}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};