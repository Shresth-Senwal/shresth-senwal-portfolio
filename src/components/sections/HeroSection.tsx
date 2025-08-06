import React from 'react';
import { motion } from 'framer-motion';
import { GradientText } from '../animated/GradientText';
import { RotatingText } from '../animated/RotatingText';
import { GlassButton } from '@/components/ui/glass-button';
import RippleGrid from '@/components/animated/RippleGrid';
import ScrollReveal from '../animated/ScrollReveal';

interface HeroSectionProps {
  className?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ className = '' }) => {
  const roles = [
    'AI/ML Engineer',
    'Full-Stack Developer',
    'B.Tech IT Student',
    'Robotics Enthusiast',
    'Problem Solver'
  ];

  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={`min-h-screen flex items-center justify-center relative overflow-hidden py-8 sm:py-10 ${className}`}>
      {/* Background grid - only in hero section */}
      <div className="absolute inset-0 w-full h-full">
        <RippleGrid
          enableRainbow={false}
          gridColor="#9333ea"
          rippleIntensity={0.15}
          gridSize={6}
          gridThickness={25}
          mouseInteraction={true}
          mouseInteractionRadius={2.5}
          opacity={0.9}
          glowIntensity={0.3}
          fadeDistance={2.5}
          vignetteStrength={1.2}
        />
      </div>

      {/* Background effects */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-portfolio-purple/25 rounded-full filter blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-portfolio-purple-light/20 rounded-full filter blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-portfolio-accent/15 rounded-full filter blur-3xl" />
      </motion.div>

      <div className="relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 text-white leading-tight">
            {/* Glitch effect for name */}
            <span className="glitch" aria-label="SHRESTH SENWAL">
              SHRESTH SENWAL
            </span>
        {/* Glitch effect styles */}
        <style>{`
          .glitch {
            position: relative;
            color: #fff;
            font-family: inherit;
            display: inline-block;
            animation: glitch-skew 1.5s infinite linear alternate;
          }
          .glitch::before, .glitch::after {
            content: attr(aria-label);
            position: absolute;
            left: 0;
            width: 100%;
            overflow: hidden;
            color: #fff;
            background: transparent;
          }
          .glitch::before {
            text-shadow: -1px 0 rgba(0,255,231,0.3), 1px 1px rgba(255,0,200,0.2);
            clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
            animation: glitch-top 1.5s infinite linear alternate;
          }
          .glitch::after {
            text-shadow: -1px 0 rgba(255,0,200,0.2), 1px 1px rgba(0,255,231,0.3);
            clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%);
            animation: glitch-bottom 1.5s infinite linear alternate;
          }
          @keyframes glitch-skew {
            0% { transform: skew(0deg); }
            20% { transform: skew(-2deg); }
            40% { transform: skew(2deg); }
            60% { transform: skew(-1deg); }
            80% { transform: skew(1deg); }
            100% { transform: skew(0deg); }
          }
          @keyframes glitch-top {
            0% { transform: translate(0, 0); }
            20% { transform: translate(-2px, -2px); }
            40% { transform: translate(2px, 2px); }
            60% { transform: translate(-1px, -1px); }
            80% { transform: translate(1px, 1px); }
            100% { transform: translate(0, 0); }
          }
          @keyframes glitch-bottom {
            0% { transform: translate(0, 0); }
            20% { transform: translate(2px, 2px); }
            40% { transform: translate(-2px, -2px); }
            60% { transform: translate(1px, 1px); }
            80% { transform: translate(-1px, -1px); }
            100% { transform: translate(0, 0); }
          }
        `}</style>
          </h1>
          <ScrollReveal
            baseOpacity={0}
            baseRotation={1}
            blurStrength={6}
            containerClassName="mb-6 md:mb-8"
            textClassName="text-lg sm:text-xl md:text-2xl text-white px-2"
            delay={0.4}
          > 
            Dedicated AI/ML engineer and full-stack web developer focused on using technology to solve real-world problems
          </ScrollReveal>
        </motion.div>

        {/* Rotating role text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-6 md:mb-8"
        >
          <RotatingText 
            texts={roles}
            className="text-lg sm:text-xl md:text-2xl h-8 md:h-10 text-white font-medium px-2"
          />
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <GlassButton
            onClick={scrollToProjects}
            size="lg"
            variant="primary"
          >
            View My Work
          </GlassButton>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2, repeat: Infinity, repeatType: "reverse" }}
      >
        <div className="w-6 h-10 border-2 border-portfolio-purple-light/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-portfolio-purple-light/80 rounded-full mt-2 animate-pulse" />
        </div>
      </motion.div>
    </section>
  );
};