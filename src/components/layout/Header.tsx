import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Magnet } from '../animated/Magnet';

interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      setIsVisible(true);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    console.log('Scrolling to section:', sectionId); // Debug log
    
    if (sectionId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsMobileMenuOpen(false);
      return;
    }
    
    const element = document.getElementById(sectionId);
    console.log('Element found:', element); // Debug log
    
    if (element) {
      // Get the header height to offset the scroll
      const headerHeight = 80; // Approximate header height
      const elementPosition = element.offsetTop - headerHeight;
      
      window.scrollTo({ 
        top: elementPosition, 
        behavior: 'smooth' 
      });
      setIsMobileMenuOpen(false);
    } else {
      console.warn(`Element with id "${sectionId}" not found`);
    }
  };

  const navItems = [
    { name: 'About', id: 'about' },
    { name: 'Experience', id: 'experience' },
    { name: 'Skills', id: 'skills' },
    { name: 'Projects', id: 'projects' },
    { name: 'Hackathons', id: 'hackathons' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 ${className}`}
      initial={{ y: 0, opacity: 1 }}
      animate={{ 
        y: 0, 
        opacity: 1 
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="backdrop-blur-sm bg-portfolio-bg/20 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <button 
            onClick={() => scrollToSection('top')}
            className="text-xl sm:text-2xl font-bold cursor-pointer text-gray-300 hover:text-white transition-all duration-300 px-2 sm:px-4 py-2 rounded-lg hover:bg-gradient-to-r hover:from-portfolio-purple/20 hover:to-portfolio-purple-light/20 hover:shadow-lg hover:shadow-purple-glow/20"
          >
            Portfolio
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4 lg:space-x-8">
            {navItems.map((item) => (
              <Magnet key={item.id} strength={0.2}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className="text-gray-300 hover:text-white transition-all duration-300 relative group px-3 lg:px-4 py-2 rounded-lg hover:bg-gradient-to-r hover:from-portfolio-purple/20 hover:to-portfolio-purple-light/20 hover:shadow-lg hover:shadow-purple-glow/20 text-sm lg:text-base"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-portfolio-purple to-portfolio-purple-light group-hover:w-full transition-all duration-300" />
                </button>
              </Magnet>
            ))}
          </nav>

          {/* Mobile menu button */}
          <motion.button
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors duration-300"
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1">
              <motion.div 
                className="w-full h-0.5 bg-white origin-center"
                animate={isMobileMenuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div 
                className="w-full h-0.5 bg-white"
                animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div 
                className="w-full h-0.5 bg-white origin-center"
                animate={isMobileMenuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden border-t border-white/5 backdrop-blur-sm bg-portfolio-bg/30"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: 'hidden' }}
          >
            <nav className="px-4 py-4 space-y-3">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Clicked:', item.id); // Debug log
                    scrollToSection(item.id);
                  }}
                  className="block w-full text-left text-gray-300 hover:text-white transition-all duration-300 px-4 py-3 rounded-lg hover:bg-gradient-to-r hover:from-portfolio-purple/20 hover:to-portfolio-purple-light/20 cursor-pointer touch-manipulation"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.name}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};