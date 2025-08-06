import React from 'react';
import { motion } from 'framer-motion';
import { Magnet } from '../animated/Magnet';
import { GlassButton } from '@/components/ui/glass-button';
import { Github, Linkedin, Mail } from 'lucide-react';
import ScrollReveal from '../animated/ScrollReveal';

interface ContactSectionProps {
  className?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ className = '' }) => {
  const socialLinks = [
    { 
      name: 'GitHub', 
      icon: Github, 
      url: 'https://github.com/Shresth-Senwal', 
      color: 'hover:text-white' 
    },
    { 
      name: 'LinkedIn', 
      icon: Linkedin, 
      url: 'https://www.linkedin.com/in/shresth-senwal-566992232/',
      color: 'hover:text-portfolio-purple-light' 
    },
    { 
      name: 'Email', 
      icon: Mail, 
      url: 'mailto:shresth.senwal@gmail.com', 
      color: 'hover:text-portfolio-accent' 
    },
  ];

  const handleDownloadCV = () => {
    // Create a link element and trigger download
    const link = document.createElement('a');
    link.href = '/assets/resume.pdf';
    link.download = 'Shresth_Senwal_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="contact" className={`py-8 sm:py-12 lg:py-16 ${className}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div>
          <ScrollReveal
            containerClassName="text-center"
            textClassName="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 text-transparent bg-clip-text bg-gradient-to-r from-portfolio-purple to-portfolio-accent px-2"
            delay={0.4}
          >
            Get In Touch
          </ScrollReveal>
        </div>

        <ScrollReveal
          baseOpacity={0.1}
          baseRotation={0}
          blurStrength={3}
          containerClassName="text-center"
          textClassName="text-gray-300 text-base sm:text-lg mb-8 sm:mb-10 md:mb-12 max-w-4xl mx-auto px-2"
          delay={0.4}
        >
          I'm always excited about new opportunities and collaborations in web development. 
          Whether you have an internship opportunity, project idea, or just want to connect, 
          feel free to reach out!
        </ScrollReveal>

        {/* Social Links */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-10 md:mb-12 px-2">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative p-3 sm:p-4 bg-white/5 backdrop-blur-md border border-white/20 rounded-lg text-gray-400 transition-all duration-300 ${link.color} shadow-lg hover:shadow-purple-glow hover:border-white/30 hover:bg-gradient-to-r hover:from-portfolio-purple/20 hover:to-portfolio-purple-light/20 overflow-hidden hover:scale-110 hover:-translate-y-1 touch-manipulation`}
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-portfolio-purple/30 to-portfolio-purple-light/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <link.icon className="w-5 h-5 sm:w-6 sm:h-6 relative z-10" />
              <span className="sr-only">{link.name}</span>
            </a>
          ))}
        </div>

        {/* Download CV Button */}
        <div>
          <GlassButton
            onClick={handleDownloadCV}
            size="lg"
            variant="primary"
          >
            <span>Download CV</span>
            <span>↓</span>
          </GlassButton>
        </div>
      </div>
    </section>
  );
};