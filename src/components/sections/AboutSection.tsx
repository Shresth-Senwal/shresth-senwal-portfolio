import React from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from '../animated/ScrollReveal';

interface AboutSectionProps {
  className?: string;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ className = '' }) => {
  return (
    <section id="about" className={`py-8 sm:py-12 lg:py-16 ${className}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* About Me Content - Centered */}
        <div className="space-y-4 sm:space-y-6">
          <ScrollReveal
            containerClassName="text-left"
            textClassName="text-2xl sm:text-3xl md:text-4xl font-bold mb-4"
            wordClassName="text-transparent bg-clip-text bg-gradient-to-r from-portfolio-purple to-portfolio-accent"
            delay={0.01}
          >
            About Me
          </ScrollReveal>

          <div className="space-y-3 sm:space-y-4">
            <ScrollReveal
              baseOpacity={0.1}
              baseRotation={0.1}
              blurStrength={1}
              textClassName="text-gray-300 text-base sm:text-lg leading-relaxed max-w-4xl mx-auto px-2"
              delay={0.01} // Reduced from 0.1 to 0.03 (30ms)
            >
              Results-driven software engineering student with hands-on experience in full-stack development, AI/ML, and distributed systems. I specialize in building high-performance, scalable applications and production-ready AI solutions using modern tech stacks.
            </ScrollReveal>

            <ScrollReveal
              baseOpacity={0.1}
              baseRotation={-0.5}
              blurStrength={1}
              textClassName="text-gray-300 text-base sm:text-lg leading-relaxed max-w-4xl mx-auto px-2"
              delay={0.01} // Reduced from 0.1 to 0.04 (40ms)
            >
              Recently completed a Generative AI Engineering Internship at Qapp.ai, where I engineered an AI-powered Vite component generation tool and an automated supplier discovery agent using LLMs and search APIs. My expertise spans React, Next.js, TypeScript, Python, and AI frameworks like PyTorch and TensorFlow. From architecting HIPAA-compliant medical platforms to developing multimodal AI paralegal tools like PolyPact, I focus on delivering impact-driven technology. I am also the Technical Secretary at IEEE RAS MUJ and a Smart India Hackathon 2025 Grand Finalist.
            </ScrollReveal>
          </div>

          <div className="pt-6 sm:pt-8">
            <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 justify-center max-w-4xl mx-auto px-2">
              {[
                'Python',
                'Java',
                'JavaScript',
                'TypeScript',
                'React',
                'Next.js',
                'Node.js',
                'PyTorch',
                'TensorFlow',
                'Flask',
                'Express.js',
                'MongoDB',
                'PostgreSQL',
                'AWS',
                'Docker',
                'GraphQL',
                'RESTful APIs',
                'Microservices'
              ].map((skill, index) => (
                <div
                  key={skill}
                  className="px-4 py-2 bg-gradient-to-r from-portfolio-purple/20 to-portfolio-purple-light/20 border border-portfolio-purple/30 rounded-full text-sm text-white backdrop-blur-sm hover:scale-105 transition-all duration-300"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};