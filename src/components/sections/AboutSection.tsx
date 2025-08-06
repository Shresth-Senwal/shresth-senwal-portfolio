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
            containerClassName="text-center"
            textClassName="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6"
            delay={0.01} // Reduced from 0.1 to 0.02 (20ms)
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
              I am a 3rd-year B.Tech Information Technology student at Manipal University Jaipur with a strong passion for AI/ML and full-stack web development. As an AI/ML intern at Innominds and Technical Secretary of IEEE RAS MUJ, I combine technical expertise with collaborative leadership to solve real-world problems.
            </ScrollReveal>

            <ScrollReveal
              baseOpacity={0.1}
              baseRotation={-0.5}
              blurStrength={1}
              textClassName="text-gray-300 text-base sm:text-lg leading-relaxed max-w-4xl mx-auto px-2"
              delay={0.01} // Reduced from 0.1 to 0.04 (40ms)
            >
              My expertise spans Python, TypeScript, PyTorch, React, Next.js 15, and Node.js. I've developed AI-powered applications including legal research tools, medical record platforms, and computer vision systems. I'm passionate about collaborative learning, UAV design, and using technology to create innovative solutions.
            </ScrollReveal>
          </div>

          <div className="pt-6 sm:pt-8">
            <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 justify-center max-w-4xl mx-auto px-2">
              {[
                'Python',
                'TypeScript',
                'PyTorch',
                'React',
                'Next.js 15',
                'Node.js',
                'AI/ML',
                'Computer Vision',
                'UAV Design',
                'Robotics'
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