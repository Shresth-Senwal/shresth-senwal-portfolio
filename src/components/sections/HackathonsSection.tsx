import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from '../animated/ScrollReveal';
import { ParticleCard, GlobalSpotlight } from '../animated/MagicBento';
import { Trophy, Calendar, MapPin, Users } from 'lucide-react';

interface HackathonsSectionProps {
  className?: string;
}

export const HackathonsSection: React.FC<HackathonsSectionProps> = ({ className = '' }) => {
  const gridRef = useRef<HTMLDivElement>(null);
  
  const hackathons = [
    {
      id: '1',
      title: 'Nebula Nexus Hackathon',
      organizer: 'Cosmos Club, MUJ',
      achievement: 'Winner - Best Tech Category',
      project: 'Fintrack GenZ Vision',
      description: 'Developed a mobile-first Gen Z finance management website, prioritizing usability and real-time insights.',
      tech: ['Finance Tech', 'Mobile-First Design', 'Real-time Analytics', 'User Experience'],
      date: '2024',
      participants: 'Team Event',
      icon: Trophy,
      color: 'from-yellow-400 to-orange-500'
    },
    {
      id: '2',
      title: 'Hackerzstreet Hackathon',
      organizer: 'IEEE CS MUJ',
      achievement: 'Finalist',
      project: 'MedSecure',
      description: 'Created MedSecure, a HIPAA-compliant medical record management and exchange platform.',
      tech: ['Next.js 15', 'TypeScript', 'HIPAA Compliance', 'Healthcare Tech'],
      date: '2024',
      participants: 'Team Event',
      icon: Trophy,
      color: 'from-blue-400 to-purple-500'
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
      <section id="hackathons" className={`py-8 sm:py-12 lg:py-16 ${className}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <ScrollReveal
              containerClassName="text-center"
              textClassName="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-portfolio-purple to-portfolio-accent px-2"
              delay={0.4}
            >
              Hackathons & Achievements
            </ScrollReveal>
            <ScrollReveal
              baseOpacity={0.1}
              baseRotation={-0.5}
              blurStrength={3}
              containerClassName="text-center"
              textClassName="text-gray-300 text-base sm:text-lg max-w-4xl mx-auto leading-relaxed px-2"
              delay={0.4}
            >
              Competitive programming events where innovation meets rapid development and creative problem-solving
            </ScrollReveal>
          </div>

          {/* Hackathons Grid */}
          <div ref={gridRef} className="bento-section grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {hackathons.map((hackathon, index) => (
              <div key={hackathon.id} className="card">
                <ParticleCard
                  className="group relative h-full p-6 sm:p-8 bg-gradient-to-br from-portfolio-purple/10 to-portfolio-purple-light/20 rounded-2xl border border-portfolio-purple/30 backdrop-blur-sm overflow-hidden hover:shadow-2xl hover:shadow-portfolio-purple/20 transition-all duration-500 hover:scale-[1.02]"
                  enableTilt={true}
                  enableMagnetism={true}
                  clickEffect={true}
                  particleCount={10}
                  glowColor="132, 0, 255"
                >
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-portfolio-purple/20 via-transparent to-portfolio-purple-light/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10 h-full flex flex-col">
                    {/* Header with Icon */}
                    <div className="flex items-start justify-between mb-4 sm:mb-6">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-r ${hackathon.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                          <hackathon.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-portfolio-purple-light group-hover:bg-clip-text transition-all duration-300">
                            {hackathon.title}
                          </h3>
                          <p className="text-gray-400 text-sm sm:text-base">
                            {hackathon.organizer}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Achievement Badge */}
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400 text-sm font-bold rounded-full border border-yellow-500/40">
                        🏆 {hackathon.achievement}
                      </span>
                    </div>

                    {/* Project Info */}
                    <div className="mb-4 sm:mb-6 flex-grow">
                      <h4 className="text-portfolio-purple-light font-semibold text-lg mb-2">
                        {hackathon.project}
                      </h4>
                      <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                        {hackathon.description}
                      </p>
                    </div>

                    {/* Meta Information */}
                    <div className="grid grid-cols-2 gap-4 mb-4 sm:mb-6 text-sm">
                      <div className="flex items-center gap-2 text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span>{hackathon.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <Users className="w-4 h-4" />
                        <span>{hackathon.participants}</span>
                      </div>
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {hackathon.tech.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gradient-to-r from-portfolio-purple/30 to-portfolio-purple-light/30 border border-portfolio-purple/40 rounded-full text-white text-xs sm:text-sm font-medium hover:scale-105 transition-transform duration-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Bottom accent */}
                    <div className="mt-4 sm:mt-6 flex justify-between items-center">
                      <div className="h-1 w-16 sm:w-20 bg-gradient-to-r from-portfolio-purple/60 to-portfolio-purple-light/60 rounded-full group-hover:w-24 sm:group-hover:w-32 transition-all duration-500" />
                      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-white/10 to-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-portfolio-purple" />
                      </div>
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
