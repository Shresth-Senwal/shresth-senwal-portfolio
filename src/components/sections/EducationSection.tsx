import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ScrollStack, ScrollStackItem } from '../animated/ScrollStack';
import { CountUp } from '../animated/CountUp';
import ScrollReveal from '../animated/ScrollReveal';
import { ParticleCard, GlobalSpotlight } from '../animated/MagicBento';
import { useIsMobile } from '@/hooks/use-mobile';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface EducationSectionProps {
  className?: string;
}

export const EducationSection: React.FC<EducationSectionProps> = ({ className = '' }) => {
  const achievementsGridRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  const educationItems = [
    'Manipal University Jaipur - B.Tech Information Technology (2023-2027) - Expected Graduation: May 2027',
    'Relevant Coursework: Artificial Intelligence, Machine Learning, Robotics',
    'IEEE RAS (Robotics and Automation Society) Member',
    'Technical Secretary, IEEE RAS MUJ (May 2025 – Present)',
    'Head of UAV Design, IEEE RAS MUJ (July 2024 – May 2025)',
    'AI/ML Intern at Innominds (May 2025 – Present)',
    'Winner, Best Tech Category – Nebula Nexus Hackathon (Cosmos Club, MUJ)',
    'Finalist – Hackerzstreet Hackathon (IEEE CS MUJ)',
    'Computer Vision and Deep Learning Specialization'
  ];

  // Auto-advance cards on mobile for seamless experience
  useEffect(() => {
    if (!isMobile || !isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentCardIndex((prev) => (prev + 1) % educationItems.length);
    }, 4000); // Change card every 4 seconds

    return () => clearInterval(interval);
  }, [isMobile, isAutoPlaying, educationItems.length]);
  
  const achievements = [
    { number: 3, suffix: 'rd', label: 'Year B.Tech IT' },
    { number: 2027, suffix: '', label: 'Expected Graduation' },
    { number: 11, suffix: '+', label: 'Major Projects' },
    { number: 2, suffix: '', label: 'Hackathon Wins' },
  ];

  const nextCard = () => {
    setCurrentCardIndex((prev) => (prev + 1) % educationItems.length);
    setIsAutoPlaying(false); // Pause auto-play when user interacts
  };

  const prevCard = () => {
    setCurrentCardIndex((prev) => (prev - 1 + educationItems.length) % educationItems.length);
    setIsAutoPlaying(false); // Pause auto-play when user interacts
  };

  const renderEducationCard = (item: string, index: number, isActive: boolean = true) => {
    // Determine the type of education item
    const isUniversity = item.includes('Manipal University');
    const isSchool = item.includes('Amity International');
    const isCertification = !isUniversity && !isSchool;
    
    let icon = "🎓"; // Default graduation cap
    let bgGradient = "from-portfolio-purple/20 to-portfolio-purple-light/30";
    let borderGradient = "from-portfolio-purple/40 to-portfolio-purple-light/30";
    
    if (isUniversity) {
      icon = "🏛️";
      bgGradient = "from-portfolio-purple/30 to-portfolio-accent/20";
      borderGradient = "from-portfolio-purple/50 to-portfolio-accent/40";
    } else if (isSchool) {
      icon = "🏫";
      bgGradient = "from-portfolio-accent/20 to-portfolio-purple-light/20";
      borderGradient = "from-portfolio-accent/40 to-portfolio-purple-light/40";
    } else if (isCertification) {
      icon = "📜";
      bgGradient = "from-portfolio-purple-light/20 to-portfolio-purple/20";
      borderGradient = "from-portfolio-purple-light/40 to-portfolio-purple/40";
    }

    return (
      <motion.div
        key={index}
        className={`group relative text-center p-4 sm:p-8 md:p-12 min-h-[160px] sm:min-h-[180px] md:min-h-[190px] w-full max-w-sm mx-auto bg-portfolio-purple/20 rounded-[24px] sm:rounded-[32px] md:rounded-[48px] border-2 sm:border-3 md:border-4 border-portfolio-purple/60 backdrop-blur-md overflow-hidden shadow-sm shadow-portfolio-purple/20 hover:shadow-md hover:shadow-portfolio-purple/30 transition-all duration-300 ${isMobile ? 'hover:scale-[1.02]' : 'hover:scale-105'}`}
        layout
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="relative z-10 h-full flex flex-col justify-between">
          {/* Header with icon */}
          <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-[16px] sm:rounded-[24px] md:rounded-[32px] bg-gradient-to-r ${bgGradient} flex items-center justify-center text-lg sm:text-xl md:text-2xl group-hover:scale-110 transition-transform duration-300`}>
              {icon}
            </div>
            <div className="flex-1">
              <div className={`w-full h-1 bg-gradient-to-r ${borderGradient} rounded-full mb-2 opacity-60 group-hover:opacity-100 transition-opacity duration-300`}></div>
              <div className="text-xs text-gray-400 uppercase tracking-wider font-medium">
                {isUniversity ? 'University' : isSchool ? 'School' : 'Certification'}
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-1 flex items-center">
            <p className="text-white text-sm sm:text-base md:text-lg leading-relaxed font-semibold drop-shadow-md group-hover:text-portfolio-purple-light transition-colors duration-300">
              {item}
            </p>
          </div>
          
          {/* Footer accent */}
          <div className="mt-4 sm:mt-6 flex justify-between items-center">
            <div className={`h-2 w-16 sm:w-20 bg-gradient-to-r ${borderGradient} rounded-full opacity-40 group-hover:opacity-80 group-hover:w-24 sm:group-hover:w-32 transition-all duration-500`}></div>
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-white/10 to-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-portfolio-purple"></div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <>
      <GlobalSpotlight
        gridRef={achievementsGridRef}
        enabled={true}
        spotlightRadius={250}
        glowColor="132, 0, 255"
      />
      <section id="skills" className={`py-8 sm:py-12 lg:py-16 ${className}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <ScrollReveal
              containerClassName="text-center"
              textClassName="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white px-2"
            >
              Education & Certifications
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Education ScrollStack */}
            <div className="flex flex-col space-y-8">
              <ScrollReveal
                baseRotation={-1}
                containerClassName="text-center mb-2"
                textClassName="text-2xl font-bold text-white"
                delay={0.4}
              >
                Academic Journey
              </ScrollReveal>
              <div className="flex justify-center mt-0">
                {isMobile ? (
                  // Mobile: Clean carousel with fade transitions
                  <div className="w-full max-w-sm mx-auto">
                    <div className="relative">
                      {/* Current card with swipe support and fade transitions */}
                      <motion.div 
                        className="mb-6"
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.2}
                        onDragEnd={(_, info) => {
                          const threshold = 50;
                          if (info.offset.x > threshold) {
                            prevCard();
                          } else if (info.offset.x < -threshold) {
                            nextCard();
                          }
                        }}
                        onDragStart={() => setIsAutoPlaying(false)} // Pause auto-play on swipe
                      >
                        <motion.div
                          key={currentCardIndex}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                        >
                          {renderEducationCard(educationItems[currentCardIndex], currentCardIndex, true)}
                        </motion.div>
                      </motion.div>
                      
                      {/* Minimalist navigation - just arrows */}
                      <div className="flex justify-between items-center px-8 mb-4">
                        <button
                          onClick={prevCard}
                          className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all duration-300 touch-manipulation backdrop-blur-sm border border-white/10"
                          aria-label="Previous education item"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        
                        <button
                          onClick={nextCard}
                          className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all duration-300 touch-manipulation backdrop-blur-sm border border-white/10"
                          aria-label="Next education item"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                      
                      {/* Simple progress indicator */}
                      <div className="text-center">
                        <div className="text-xs text-gray-500 mb-2">
                          {currentCardIndex + 1} of {educationItems.length}
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-1 mb-2">
                          <motion.div 
                            className="bg-gradient-to-r from-portfolio-purple to-portfolio-purple-light h-1 rounded-full"
                            initial={{ width: "0%" }}
                            animate={{ width: `${((currentCardIndex + 1) / educationItems.length) * 100}%` }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>
                        <div className="text-xs text-gray-500/60">
                          Swipe or tap arrows to navigate
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Desktop: Original ScrollStack
                  <ScrollStack
                    className="w-full max-w-lg"
                    itemDistance={60}
                    itemScale={0.05}
                    itemStackDistance={25}
                    stackPosition="25%"
                    scaleEndPosition="15%"
                    baseScale={0.88}
                    rotationAmount={1}
                    blurAmount={0.5}
                  >
                    {educationItems.map((item, index) => {
                      // Determine the type of education item
                      const isUniversity = item.includes('Manipal University');
                      const isSchool = item.includes('Amity International');
                      const isCertification = !isUniversity && !isSchool;
                      
                      let icon = "🎓"; // Default graduation cap
                      let bgGradient = "from-portfolio-purple/20 to-portfolio-purple-light/30";
                      let borderGradient = "from-portfolio-purple/40 to-portfolio-purple-light/30";
                      
                      if (isUniversity) {
                        icon = "🏛️";
                        bgGradient = "from-portfolio-purple/30 to-portfolio-accent/20";
                        borderGradient = "from-portfolio-purple/50 to-portfolio-accent/40";
                      } else if (isSchool) {
                        icon = "🏫";
                        bgGradient = "from-portfolio-accent/20 to-portfolio-purple-light/20";
                        borderGradient = "from-portfolio-accent/40 to-portfolio-purple-light/40";
                      } else if (isCertification) {
                        icon = "📜";
                        bgGradient = "from-portfolio-purple-light/20 to-portfolio-purple/20";
                        borderGradient = "from-portfolio-purple-light/40 to-portfolio-purple/40";
                      }
                      
                      return (
                        <ScrollStackItem
                          key={index}
                          itemClassName={`group relative text-center p-16 min-h-[190px] min-w-[300px] bg-portfolio-purple/20 rounded-[56px] border-4 border-portfolio-purple/60 backdrop-blur-md overflow-hidden shadow-sm shadow-portfolio-purple/20 hover:shadow-md hover:shadow-portfolio-purple/30 transition-all duration-300 hover:scale-105`}
                        >
                          <div className="relative z-10 h-full flex flex-col justify-between">
                            {/* Header with icon */}
                            <div className="flex items-start gap-4 mb-6">
                              <div className={`w-14 h-14 rounded-[32px] bg-gradient-to-r ${bgGradient} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300`}>
                                {icon}
                              </div>
                              <div className="flex-1">
                                <div className={`w-full h-1 bg-gradient-to-r ${borderGradient} rounded-full mb-2 opacity-60 group-hover:opacity-100 transition-opacity duration-300`}></div>
                                <div className="text-xs text-gray-400 uppercase tracking-wider font-medium">
                                  {isUniversity ? 'University' : isSchool ? 'School' : 'Certification'}
                                </div>
                              </div>
                            </div>
                            
                            {/* Content */}
                            <div className="flex-1 flex items-center">
                              <p className="text-white text-lg leading-relaxed font-semibold drop-shadow-md group-hover:text-portfolio-purple-light transition-colors duration-300">
                                {item}
                              </p>
                            </div>
                            
                            {/* Footer accent */}
                            <div className="mt-6 flex justify-between items-center">
                              <div className={`h-2 w-20 bg-gradient-to-r ${borderGradient} rounded-full opacity-40 group-hover:opacity-80 group-hover:w-32 transition-all duration-500`}></div>
                              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-white/10 to-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="w-3 h-3 rounded-full bg-portfolio-purple"></div>
                              </div>
                            </div>
                          </div>
                        </ScrollStackItem>
                      );
                    })}
                  </ScrollStack>
                )}
              </div>
            </div>

            {/* Statistics */}
            <div className="flex flex-col space-y-8">
              <ScrollReveal
                baseRotation={1}
                containerClassName="text-center"
                textClassName="text-2xl font-bold text-white"
                delay={0.4}
              >
                Academic Achievements
              </ScrollReveal>
              
              <div className="flex justify-center">
                <div ref={achievementsGridRef} className="bento-section grid grid-cols-1 sm:grid-cols-2 gap-y-8 sm:gap-y-12 md:gap-y-16 gap-x-6 sm:gap-x-8 md:gap-x-12 max-w-2xl w-full mx-auto place-items-center mt-6 sm:mt-8">
                  <style>
                    {`
                      .achievement-card--border-glow::after {
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
                      
                      .achievement-card--border-glow:hover::after {
                        opacity: 1;
                      }
                      
                      .achievement-particle::before {
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
                  {achievements.map((achievement, index) => (
                    <div key={achievement.label} className="card flex items-center justify-center">
                      <style>
                        {`
                          .achievement-card--border-glow::after {
                            content: '';
                            position: absolute;
                            inset: 0;
                            padding: 6px;
                            background: radial-gradient(var(--glow-radius) circle at var(--glow-x) var(--glow-y),
                                rgba(132, 0, 255, calc(var(--glow-intensity) * 0.8)) 0%,
                                rgba(132, 0, 255, calc(var(--glow-intensity) * 0.4)) 30%,
                                transparent 60%);
                            border-radius: inherit;
                            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0, 0);
                            mask-composite: subtract;
                            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0, 0);
                            -webkit-mask-composite: xor;
                            pointer-events: none;
                            transition: opacity 0.3s ease;
                            z-index: 1;
                          }
                          
                          .achievement-card--border-glow:hover::after {
                            opacity: 1;
                          }
                          
                          .achievement-particle::before {
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
                        className="group relative text-center p-16 min-h-[190px] min-w-[300px] bg-gradient-to-br from-portfolio-purple/20 to-portfolio-purple-light/30 rounded-xl border border-portfolio-purple/40 backdrop-blur-sm overflow-hidden hover:shadow-2xl hover:shadow-portfolio-purple/30 transition-all duration-300 hover:scale-105 achievement-card--border-glow"
                        style={{
                          '--glow-x': '50%',
                          '--glow-y': '50%',
                          '--glow-intensity': '0',
                          '--glow-radius': '200px',
                        } as React.CSSProperties}
                        enableTilt={true}
                        enableMagnetism={true}
                        clickEffect={true}
                        particleCount={6}
                        glowColor="132, 0, 255"
                      >
                        {/* Gradient overlay on hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-portfolio-purple/30 via-transparent to-portfolio-purple-light/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        {/* Animated border gradient */}
                        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                        
                        <div className="relative z-10">
                          <CountUp
                            end={achievement.number}
                            suffix={achievement.suffix}
                            className="text-3xl font-bold mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-portfolio-purple-light group-hover:bg-clip-text transition-all duration-300"
                          />
                          <p className="text-gray-300 text-sm group-hover:text-white transition-colors duration-300">{achievement.label}</p>
                        </div>
                      </ParticleCard>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};