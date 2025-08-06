import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SplashCursor from '@/components/animated/SplashCursor';
import { ClickSpark } from '@/components/animated/ClickSpark';
import { LoadingScreen } from '@/components/animated/LoadingScreen';
import { Header } from '@/components/layout/Header';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { EducationSection } from '@/components/sections/EducationSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { HackathonsSection } from '@/components/sections/HackathonsSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { useIsMobile } from '@/hooks/use-mobile';
import { isMobileDevice } from '@/lib/responsive';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useIsMobile();
  const [deviceIsMobile, setDeviceIsMobile] = useState(false);

  useEffect(() => {
    setDeviceIsMobile(isMobileDevice());
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <div className="relative min-h-screen bg-[#0f0f23] overflow-x-hidden">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loading" onLoadingComplete={handleLoadingComplete} />
        ) : (
          <motion.div
            key="main-content"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 1.2, 
              ease: "easeOut",
              delay: 0.2
            }}
            className="relative min-h-screen"
          >
            <ClickSpark>
              <div className="relative min-h-screen">
                {/* Global cursor effects - disabled on mobile for better performance */}
                {!deviceIsMobile && <SplashCursor SPLAT_RADIUS={0.08} SPLAT_FORCE={3000} />}
                
                {/* Header */}
                <Header />
                
                {/* Main content */}
                <motion.main 
                  className="relative z-10 pt-16 sm:pt-20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.6 }}
                  >
                    <HeroSection />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                  >
                    <AboutSection />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.3, duration: 0.6 }}
                  >
                    <ExperienceSection />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4, duration: 0.6 }}
                  >
                    <EducationSection />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 0.6 }}
                  >
                    <ProjectsSection />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.55, duration: 0.6 }}
                  >
                    <HackathonsSection />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.6, duration: 0.6 }}
                  >
                    <ContactSection />
                  </motion.div>
                </motion.main>
              </div>
            </ClickSpark>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
