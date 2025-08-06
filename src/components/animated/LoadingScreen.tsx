/**
 * LoadingScreen Component
 * 
 * A beautiful, detailed loading screen that matches the portfolio's purple theme.
 * Features animated React logo, progress bar, particle effects, and smooth transitions.
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing bluds...');
  const [isComplete, setIsComplete] = useState(false);

  const loadingSteps = [
    { progress: 15, text: 'Initializing bluds...' },
    { progress: 35, text: 'Loading Portfolio...' },
    { progress: 55, text: 'Preparing Projects...' },
    { progress: 75, text: 'Setting up Experience...' },
    { progress: 90, text: 'Finalizing Details...' },
    { progress: 100, text: 'Welcome to bluds!' }
  ];

  useEffect(() => {
    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < loadingSteps.length) {
        const step = loadingSteps[currentStep];
        setProgress(step.progress);
        setLoadingText(step.text);
        currentStep++;
      } else {
        setIsComplete(true);
        setTimeout(() => {
          onLoadingComplete();
        }, 1000);
        clearInterval(interval);
      }
    }, 800);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  // Particle animation configuration - simplified for performance
  const particleAnimation = {
    y: [0, -15, 0],
    opacity: [0.3, 0.7, 0.3],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  };

  // Logo animation configuration
  const logoAnimation = {
    initial: { scale: 0, rotate: -360, opacity: 0 },
    animate: {
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 80,
        damping: 12,
        duration: 2,
        ease: "easeOut" as const
      }
    },
    exit: {
      scale: 1.1,
      opacity: 0,
      rotate: 90,
      transition: { 
        duration: 0.8,
        ease: "easeInOut" as const
      }
    }
  };

  // React Logo SVG Component - optimized
  const ReactLogo = () => (
    <motion.svg
      width="192"
      height="192"
      viewBox="0 0 64 64"
      className="text-portfolio-purple"
    >
      {/* Minimal React logo: only strokes, no fill */}
      <g fill="none" stroke="currentColor" strokeWidth="2">
        <ellipse
          cx="32"
          cy="32"
          rx="20"
          ry="6"
          opacity="0.8"
        />
        <ellipse
          cx="32"
          cy="32"
          rx="20"
          ry="6"
          transform="rotate(60 32 32)"
          opacity="0.6"
        />
        <ellipse
          cx="32"
          cy="32"
          rx="20"
          ry="6"
          transform="rotate(120 32 32)"
          opacity="0.4"
        />
        {/* Center nucleus: stroke only, no fill */}
        <circle
          cx="32"
          cy="32"
          r="3"
          stroke="currentColor"
          fill="none"
        />
      </g>
    </motion.svg>
  );

  // Progress bar animation
  const progressAnimation = {
    initial: { width: 0 },
    animate: {
      width: `${progress}%`,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1] as const
      }
    }
  };

  // Container exit animation
  const containerExitAnimation = {
    opacity: 0,
    scale: 1.05,
    transition: {
      duration: 1.2,
      ease: "easeInOut" as const
    }
  };

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          exit={containerExitAnimation}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#0f0f23] via-[#1a102b] to-[#0f0f23] overflow-hidden"
        >
          {/* Animated background particles - reduced count */}
          <div className="absolute inset-0">
            {/* Large background particles */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                animate={particleAnimation}
                className="absolute w-2 h-2 bg-portfolio-purple/30 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.5}s`
                }}
              />
            ))}
            
            {/* Small floating particles */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={`small-${i}`}
                animate={{
                  ...particleAnimation,
                  transition: {
                    ...particleAnimation.transition,
                    delay: i * 0.3
                  }
                }}
                className="absolute w-1 h-1 bg-portfolio-purple-light/40 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>

          {/* Gradient overlay effects - simplified */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-portfolio-purple/20 rounded-full filter blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-portfolio-purple-light/15 rounded-full filter blur-3xl" />
          </div>

          {/* Main loading content */}
          <div className="relative z-10 text-center max-w-md mx-auto px-6">
            {/* Logo/Initial */}
            <motion.div
              initial={logoAnimation.initial}
              animate={logoAnimation.animate}
              exit={logoAnimation.exit}
              className="mb-12"
            >
              <div className="relative">
                {/* Large React Logo, no surrounding circle */}
                <div className="flex items-center justify-center w-full">
                  <div className="w-64 h-64 flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      style={{ width: '100%', height: '100%' }}
                    >
                      <ReactLogo />
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Team name */}
            <motion.h1
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                delay: 0.5, 
                duration: 1.2,
                ease: [0.4, 0, 0.2, 1] as const
              }}
              className="text-3xl font-bold text-white mb-2"
            >
              bluds
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 0.7, 
                duration: 1,
                ease: [0.4, 0, 0.2, 1] as const
              }}
              className="text-portfolio-purple-light mb-12 text-lg"
            >
              Development Team
            </motion.p>

            {/* Loading text */}
            <AnimatePresence mode="wait">
              <motion.div
                key={loadingText}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="mb-8"
              >
                <p className="text-gray-300 text-lg font-medium">{loadingText}</p>
              </motion.div>
            </AnimatePresence>

            {/* Progress bar container */}
            <div className="relative w-full max-w-xs mx-auto">
              {/* Background bar */}
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                {/* Progress fill */}
                <div
                  className="h-full bg-gradient-to-r from-portfolio-purple to-portfolio-purple-light rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${progress}%` }}
                /></div>
              
              {/* Progress percentage */}
              <div className="mt-4 text-center">
                <span className="text-portfolio-purple-light font-semibold text-sm transition-all duration-500">
                  {progress}%
                </span>
              </div>
            </div>

            {/* Loading dots animation - simplified */}
            <div className="flex justify-center space-x-2 mt-8">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                  className="w-2 h-2 bg-portfolio-purple rounded-full"
                />
              ))}
            </div>

            {/* Completion message */}
            {progress === 100 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ 
                  delay: 0.5, 
                  duration: 1,
                  ease: [0.4, 0, 0.2, 1] as const
                }}
                className="mt-8"
              >
                <p className="text-white text-xl font-semibold">
                  � Ready to dive in!
                </p>
              </motion.div>
            )}
          </div>

          {/* Bottom decorative elements */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <motion.div
              animate={{ 
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-8 bg-gradient-to-t from-portfolio-purple to-transparent rounded-full"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
