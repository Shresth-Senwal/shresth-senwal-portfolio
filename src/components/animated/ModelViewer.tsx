import React from 'react';
import { motion } from 'framer-motion';

interface ModelViewerProps {
  className?: string;
}

export const ModelViewer: React.FC<ModelViewerProps> = ({ className = '' }) => {
  return (
    <motion.div
      className={`w-full h-96 relative overflow-hidden rounded-xl ${className}`}
      initial={{ opacity: 0, rotateY: -90 }}
      whileInView={{ opacity: 1, rotateY: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-portfolio-purple/20 via-portfolio-cyan/20 to-portfolio-green/20" />
      
      {/* Floating geometric shapes */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Main sphere */}
        <motion.div
          className="absolute w-32 h-32 rounded-full bg-gradient-to-br from-portfolio-purple to-portfolio-purple/60 shadow-glow"
          animate={{
            y: [0, -20, 0],
            rotateY: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            rotateY: { duration: 8, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          }}
        />

        {/* Orbiting ring */}
        <motion.div
          className="absolute w-48 h-48 border-4 border-portfolio-cyan rounded-full"
          style={{ borderStyle: 'dashed' }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            rotate: { duration: 6, repeat: Infinity, ease: "linear" },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          }}
        />

        {/* Floating cube */}
        <motion.div
          className="absolute w-16 h-16 bg-gradient-to-br from-portfolio-green to-portfolio-green/60 transform rotate-45 shadow-cyan-glow"
          style={{ top: '20%', right: '20%' }}
          animate={{
            y: [0, 15, 0],
            rotate: [45, 405],
            scale: [1, 0.8, 1],
          }}
          transition={{
            y: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 10, repeat: Infinity, ease: "linear" },
            scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          }}
        />

        {/* Floating triangle */}
        <motion.div
          className="absolute w-0 h-0 border-l-8 border-r-8 border-b-16 border-l-transparent border-r-transparent border-b-portfolio-cyan shadow-glow"
          style={{ bottom: '25%', left: '15%' }}
          animate={{
            y: [0, -25, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 12, repeat: Infinity, ease: "linear" },
          }}
        />

        {/* Small floating dots */}
        {[...Array(6)].map((_, index) => (
          <motion.div
            key={index}
            className="absolute w-3 h-3 rounded-full bg-white/60"
            style={{
              left: `${20 + index * 12}%`,
              top: `${30 + (index % 2) * 40}%`,
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.6, 1, 0.6],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + index * 0.3,
              repeat: Infinity,
              delay: index * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Particle effects */}
        <div className="absolute inset-0">
          {[...Array(12)].map((_, index) => (
            <motion.div
              key={index}
              className="absolute w-1 h-1 bg-gradient-to-r from-portfolio-purple to-portfolio-cyan rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                x: [0, (Math.random() - 0.5) * 40],
                y: [0, (Math.random() - 0.5) * 40],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: index * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};