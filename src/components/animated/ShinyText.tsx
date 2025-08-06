import React from 'react';
import { motion } from 'framer-motion';

interface ShinyTextProps {
  children: React.ReactNode;
  className?: string;
}

export const ShinyText: React.FC<ShinyTextProps> = ({ children, className = '' }) => {
  return (
    <motion.div
      className={`relative inline-block ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div
        className="relative overflow-hidden bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent font-bold"
        style={{
          backgroundSize: '200% 100%',
          animation: 'shimmer 2s ease-in-out infinite',
        }}
      >
        {children}
      </div>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
        style={{
          transform: 'translateX(-100%)',
          filter: 'blur(1px)',
        }}
        animate={{
          transform: ['translateX(-100%)', 'translateX(100%)'],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatDelay: 2,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
};