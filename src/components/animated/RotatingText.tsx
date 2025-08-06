import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RotatingTextProps {
  texts: string[];
  className?: string;
  interval?: number;
}

export const RotatingText: React.FC<RotatingTextProps> = ({
  texts,
  className = '',
  interval = 3000
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % texts.length);
    }, interval);

    return () => clearInterval(timer);
  }, [texts.length, interval]);

  const textVariants = {
    enter: {
      y: 15,
      opacity: 0,
      scale: 0.95,
    },
    center: {
      y: 0,
      opacity: 1,
      scale: 1,
    },
    exit: {
      y: -15,
      opacity: 0,
      scale: 0.95,
    },
  };

  return (
    <div className={`relative ${className}`} style={{ minHeight: '2rem' }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          variants={textVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            duration: 0.8,
            ease: [0.4, 0, 0.2, 1],
          }}
          className="absolute inset-0 flex items-center justify-center text-white font-medium"
          style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3))' }}
        >
          {texts[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};