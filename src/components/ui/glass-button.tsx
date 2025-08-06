/**
 * Glass Button Component
 * 
 * A professional glass-morphism button component with subtle hover effects.
 * Replaces animated buttons for a more professional appearance while maintaining
 * visual appeal through modern glass-like styling.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export const GlassButton: React.FC<GlassButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  disabled = false,
  type = 'button'
}) => {
  const baseClasses = `
    relative overflow-hidden rounded-lg font-medium transition-all duration-300
    backdrop-blur-md border border-white/20 shadow-lg
    hover:shadow-purple-glow hover:border-white/30
    active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const variantClasses = {
    primary: `
      bg-gradient-to-r from-portfolio-purple/30 to-portfolio-purple-light/30
      text-white hover:from-portfolio-purple/60 hover:to-portfolio-purple-light/60
      hover:shadow-2xl hover:shadow-portfolio-purple/40 hover:scale-105
      before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300
    `,
    secondary: `
      bg-gradient-to-r from-white/10 to-white/5 text-portfolio-grid
      hover:bg-gradient-to-r hover:from-portfolio-purple/30 hover:to-portfolio-purple-light/30
      hover:text-white hover:shadow-2xl hover:shadow-portfolio-purple/25 hover:scale-105
      before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300
    `
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <motion.button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        'group',
        className
      )}
      onClick={onClick}
      disabled={disabled}
      type={type}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Enhanced glass effect overlay with animated gradient */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-portfolio-purple/20 via-white/10 to-portfolio-purple-light/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
      
      {/* Content */}
      <span className="relative z-10 flex items-center justify-center space-x-2">
        {children}
      </span>
    </motion.button>
  );
};
