import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedListProps {
  items: string[];
  className?: string;
}

export const AnimatedList: React.FC<AnimatedListProps> = ({ items, className = '' }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      x: -20,
      scale: 0.8 
    },
    visible: { 
      opacity: 1, 
      x: 0,
      scale: 1
    },
  };

  return (
    <motion.ul
      className={`space-y-3 ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {items.map((item, index) => (
        <motion.li
          key={index}
          variants={itemVariants}
          className="relative flex items-center space-x-3 group p-3 rounded-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-portfolio-purple/10 hover:to-portfolio-purple-light/10 hover:shadow-lg hover:shadow-portfolio-purple/20"
        >
          {/* Gradient background on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-portfolio-purple/5 via-transparent to-portfolio-purple-light/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
          
          <motion.div
            className="relative z-10 w-3 h-3 rounded-full bg-gradient-to-r from-portfolio-purple to-portfolio-purple-light group-hover:shadow-lg group-hover:shadow-portfolio-purple/50"
            whileHover={{ scale: 1.5 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
          <span className="relative z-10 text-gray-300 group-hover:text-white group-hover:font-medium transition-all duration-300">
            {item}
          </span>
        </motion.li>
      ))}
    </motion.ul>
  );
};