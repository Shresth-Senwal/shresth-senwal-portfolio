/**
 * ProjectCard Component
 * 
 * A modern, glassmorphic project card with Magic Bento animations.
 * Features particle effects, spotlight interactions, magnetic hover behaviors,
 * smooth animations, tech stack display, and interactive buttons.
 */

import React from 'react';
import { Github, ExternalLink } from 'lucide-react';
import ScrollReveal from '../animated/ScrollReveal';
import { ParticleCard } from '../animated/MagicBento';

interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  github?: string;
  demo?: string;
  image?: string;
  className?: string;
  delay?: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  tech,
  github,
  demo,
  image,
  className = '',
  delay = 0
}) => {
  return (
    <>
      <style>
        {`
          .card--border-glow::after {
            content: '';
            position: absolute;
            inset: 0;
            padding: 6px;
            background: radial-gradient(var(--glow-radius) circle at var(--glow-x) var(--glow-y),
                rgba(132, 0, 255, calc(var(--glow-intensity) * 0.8)) 0%,
                rgba(132, 0, 255, calc(var(--glow-intensity) * 0.4)) 30%,
                transparent 60%);
            border-radius: inherit;
            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            mask-composite: subtract;
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            pointer-events: none;
            transition: opacity 0.3s ease;
            z-index: 1;
          }
          
          .card--border-glow:hover::after {
            opacity: 1;
          }
          
          .particle::before {
            content: '';
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            background: rgba(132, 0, 255, 0.2);
            border-radius: 50%;
            z-index: -1;
          }
        `}
      </style>
      <ParticleCard
        className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/[0.05] backdrop-blur-sm border border-white/20 p-4 sm:p-5 md:p-6 transition-all duration-300 hover:border-portfolio-purple/60 hover:shadow-2xl hover:shadow-portfolio-purple/20 hover:scale-[1.02] ${className} card--border-glow`}
        style={{
          '--glow-x': '50%',
          '--glow-y': '50%',
          '--glow-intensity': '0',
          '--glow-radius': '200px',
        } as React.CSSProperties}
        enableTilt={true}
        enableMagnetism={true}
        clickEffect={true}
        particleCount={8}
        glowColor="132, 0, 255"
      >
      {/* Enhanced gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-portfolio-purple/15 via-portfolio-purple-light/10 to-portfolio-purple/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Animated shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />

      <div className="relative z-10">
        {/* Project Title */}
        <ScrollReveal
          baseOpacity={0}
          baseRotation={0.5}
          blurStrength={2}
          containerClassName="mb-2 sm:mb-3"
          textClassName="text-lg sm:text-xl font-bold text-white group-hover:text-portfolio-purple-light transition-all duration-300"
          delay={delay}
        >
          {title}
        </ScrollReveal>

        {/* Project Description */}
        <ScrollReveal
          baseOpacity={0.1}
          baseRotation={-0.3}
          blurStrength={1}
          containerClassName="mb-3 sm:mb-4"
          textClassName="text-gray-300 text-sm sm:text-base leading-relaxed group-hover:text-gray-200 transition-colors duration-300"
          delay={delay + 0.1}
        >
          {description}
        </ScrollReveal>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-5 md:mb-6">
          {tech.map((technology, index) => (
            <span
              key={technology}
              className="text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/10 text-gray-300 group-hover:bg-gradient-to-r group-hover:from-portfolio-purple/20 group-hover:to-portfolio-purple-light/20 group-hover:text-white transition-all duration-300 hover:scale-105"
            >
              {technology}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-gradient-to-r from-white/10 to-white/5 hover:from-portfolio-purple/40 hover:to-portfolio-purple-light/40 text-gray-300 hover:text-white transition-all duration-300 text-sm font-medium hover:scale-105 hover:shadow-lg hover:shadow-portfolio-purple/30 overflow-hidden group/btn touch-manipulation"
            >
              {/* Button shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-500" />
              <Github className="w-4 h-4 relative z-10" />
              <span className="relative z-10">Code</span>
            </a>
          )}
          
          {demo && (
            <a
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-gradient-to-r from-portfolio-purple/30 to-portfolio-purple-light/30 hover:from-portfolio-purple/50 hover:to-portfolio-purple-light/50 text-white transition-all duration-300 text-sm font-medium hover:scale-105 hover:shadow-lg hover:shadow-portfolio-purple/40 overflow-hidden group/btn touch-manipulation"
            >
              {/* Button shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-500" />
              <ExternalLink className="w-4 h-4 relative z-10" />
              <span className="relative z-10">Live Demo</span>
            </a>
          )}
        </div>
      </div>
    </ParticleCard>
    </>
  );
};
