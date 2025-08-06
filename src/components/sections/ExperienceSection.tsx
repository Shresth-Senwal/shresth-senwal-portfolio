import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from '../animated/ScrollReveal';
import { ParticleCard, GlobalSpotlight } from '../animated/MagicBento';

interface ExperienceSectionProps {
  className?: string;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ className = '' }) => {
  const gridRef = useRef<HTMLDivElement>(null);
  
  const experiences = [
    {
      id: '1',
      title: 'AI/ML Intern',
      company: 'Innominds',
      location: 'Remote',
      period: 'May 2025 – Present',
      responsibilities: [
        'Assist with machine learning and AI projects, including computer vision and analytics',
        'Collaborate with team on optimizing model performance and integrating solutions into real-world applications',
        'Engage in code discussions and contribute to the team\'s understanding of AI/ML best practices'
      ],
      tech: ['Machine Learning', 'Computer Vision', 'Python', 'AI Analytics']
    },
    {
      id: '2', 
      title: 'Technical Secretary',
      company: 'IEEE Robotics and Automation Society, MUJ',
      location: 'Manipal University Jaipur',
      period: 'May 2025 – Present',
      responsibilities: [
        'Support the society\'s technical activities, documentation, and events',
        'Encourage collaboration, foster technical engagement, and share knowledge among student members',
        'Help organize robotics and automation workshops, promoting a community of learners'
      ],
      tech: ['Robotics', 'Automation', 'Technical Documentation', 'Leadership']
    },
    {
      id: '3',
      title: 'Head of UAV Design',
      company: 'IEEE Robotics and Automation Society, MUJ', 
      location: 'Manipal University Jaipur',
      period: 'July 2024 – May 2025',
      responsibilities: [
        'Led a team developing UAV systems, contributing ideas and engineering solutions alongside peers',
        'Organized technical workshops on robotics and hardware integration',
        'Emphasized collaborative learning and sharing of best practices in UAV design'
      ],
      tech: ['UAV Design', 'Hardware Integration', 'Aerospace Systems', 'Team Leadership']
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
