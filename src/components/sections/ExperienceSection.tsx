import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import ScrollReveal from '../animated/ScrollReveal';
import { ParticleCard, GlobalSpotlight } from '../animated/MagicBento';
import { GlassButton } from '../ui/glass-button';

interface ExperienceSectionProps {
  className?: string;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ className = '' }) => {
  const gridRef = useRef<HTMLDivElement>(null);
  
  const experiences = [
    {
      id: '1',
      title: 'Generative AI Engineering Intern',
      company: 'Qapp.ai',
      location: 'Remote',
      period: 'December 2025 – April 2026',
      certificateUrl: '/assets/Qapp.pdf',
      responsibilities: [
        'Engineered an AI-powered Vite component generation tool allowing users to generate, preview, and test UI components through natural language prompting',
        'Developed an AI-based supplier discovery agent integrating search APIs and LLMs to automate vendor sourcing and qualification',
        'Built a high-performance CSV and Excel data manipulation tool for seamless processing and transformation of large datasets'
      ],
      tech: ['LLMs', 'Vite', 'React', 'Search APIs', 'Data Manipulation', 'Prompt Engineering', 'Generative AI']
    },
    {
      id: '2',
      title: 'AI/ML Engineering Intern',
      company: 'Innominds',
      location: 'Remote',
      period: 'May 2025 – August 2025',
      certificateUrl: '/assets/Innominds.pdf',
      responsibilities: [
        'Implemented machine learning pipelines using Python and PyTorch, improving model accuracy by 75% through hyperparameter tuning and feature engineering',
        'Developed RESTful APIs using Flask to deploy ML models into production, handling real-time inference requests',
        'Participated in agile sprints and code reviews, following industry best practices for version control and testing'
      ],
      tech: ['Python', 'PyTorch', 'Flask', 'RESTful APIs', 'Machine Learning', 'Agile']
    },
    {
      id: '3', 
      title: 'Technical Secretary',
      company: 'IEEE RAS MUJ',
      location: 'Jaipur',
      period: 'May 2025 – Present',
      responsibilities: [
        'Directed technical documentation and engineering workflows for robotics and UAV development projects, ensuring quality standards across 5+ concurrent initiatives',
        'Led software integration for autonomous UAV systems, implementing flight control algorithms and sensor fusion for real-time navigation',
        'Organized technical workshops on embedded systems, robotics programming, and IoT integration for 100+ students'
      ],
      tech: ['Robotics', 'UAV Systems', 'Technical Leadership', 'Software Integration', 'IoT']
    },
    {
      id: '4',
      title: 'Head of UAV Design',
      company: 'IEEE RAS MUJ', 
      location: 'Jaipur',
      period: 'July 2024 – May 2025',
      responsibilities: [
        'Managed multidisciplinary team of 15 students in end-to-end design and development of UAV systems and hybrid VTOL drones using agile methodologies',
        'Designed hardware-software integration frameworks for autonomous flight systems, implementing communication protocols and control systems',
        'Led technical workshops and collaborative learning sessions on UAV design and aerospace systems'
      ],
      tech: ['UAV Design', 'VTOL Systems', 'Agile', 'Team Leadership', 'Aerospace Engineering']
    }
  ];

  return (
    <>
      <GlobalSpotlight
        gridRef={gridRef}
        enabled={true}
        spotlightRadius={300}
        glowColor="132, 0, 255"
      />
      <section id="experience" className={`py-8 sm:py-12 lg:py-16 ${className}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <ScrollReveal
              containerClassName="text-center"
              textClassName="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-portfolio-purple to-portfolio-accent px-2"
              delay={0.4}
            >
              Professional Experience
            </ScrollReveal>
            <ScrollReveal
              baseOpacity={0.1}
              baseRotation={-0.5}
              blurStrength={3}
              containerClassName="text-center"
              textClassName="text-gray-300 text-base sm:text-lg max-w-4xl mx-auto leading-relaxed px-2"
              delay={0.4}
            >
              Building expertise through hands-on experience in AI/ML, robotics, and technical leadership
            </ScrollReveal>
          </div>

          {/* Experience Timeline */}
          <div ref={gridRef} className="bento-section space-y-6 sm:space-y-8">
            {experiences.map((experience, index) => (
              <div key={experience.id} className="card">
                <ParticleCard
                  className="group relative p-6 sm:p-8 bg-gradient-to-br from-portfolio-purple/10 to-portfolio-purple-light/20 rounded-2xl border border-portfolio-purple/30 backdrop-blur-sm overflow-hidden hover:shadow-2xl hover:shadow-portfolio-purple/20 transition-all duration-500 hover:scale-[1.02]"
                  enableTilt={true}
                  enableMagnetism={true}
                  clickEffect={true}
                  particleCount={8}
                  glowColor="132, 0, 255"
                >
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-portfolio-purple/20 via-transparent to-portfolio-purple-light/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 sm:mb-6">
                      <div className="mb-2 sm:mb-0">
                        <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-portfolio-purple-light group-hover:bg-clip-text transition-all duration-300">
                          {experience.title}
                        </h3>
                        <h4 className="text-lg sm:text-xl text-portfolio-purple-light font-semibold">
                          {experience.company}
                        </h4>
                        <p className="text-gray-400 text-sm sm:text-base">
                          {experience.location}
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <span className="inline-block px-3 py-1 bg-portfolio-purple/20 text-portfolio-purple-light text-sm font-medium rounded-full border border-portfolio-purple/40">
                          {experience.period}
                        </span>
                      </div>
                    </div>

                    {/* Responsibilities */}
                    <div className="mb-4 sm:mb-6">
                      <ul className="space-y-2 sm:space-y-3">
                        {experience.responsibilities.map((responsibility, idx) => (
                          <li key={idx} className="flex items-start">
                            <div className="w-2 h-2 bg-portfolio-purple rounded-full mt-2 mr-3 flex-shrink-0" />
                            <span className="text-gray-300 text-sm sm:text-base leading-relaxed">
                              {responsibility}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mt-auto">
                      <div className="flex flex-wrap gap-2">
                        {experience.tech.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-gradient-to-r from-portfolio-purple/30 to-portfolio-purple-light/30 border border-portfolio-purple/40 rounded-full text-white text-xs sm:text-sm font-medium hover:scale-105 transition-transform duration-200"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {experience.certificateUrl && (
                        <a 
                          href={experience.certificateUrl} 
                          download 
                          className="relative flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-portfolio-purple/20 hover:bg-portfolio-purple/40 text-white transition-all duration-300 text-[10px] font-medium hover:scale-105 hover:shadow-lg hover:shadow-portfolio-purple/30 overflow-hidden group/btn touch-manipulation uppercase tracking-wider border border-portfolio-purple/30 ml-auto"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {/* Button shine effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-500" />
                          <Download size={12} className="relative z-10 text-portfolio-purple-light" />
                          <span className="relative z-10">Certificate</span>
                        </a>
                      )}
                    </div>
                  </div>
                </ParticleCard>
              </div>
            ))}
          </div>

          {/* Bottom decoration */}
          <div className="mt-12 sm:mt-14 md:mt-16 text-center">
            <div className="inline-block w-16 sm:w-20 md:w-24 h-1 bg-gradient-to-r from-transparent via-portfolio-purple to-transparent" />
          </div>
        </div>
      </section>
    </>
  );
};
