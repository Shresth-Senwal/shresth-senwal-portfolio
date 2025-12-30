/**
 * ProjectsSection Component
 * 
 * Showcases Shresth Senwal's projects in a modern grid layout with glassmorphic cards.
 * Features hover effects, gradient animations, and direct links to repositories.
 */

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ProjectCard } from '../ui/ProjectCard';
import ScrollReveal from '../animated/ScrollReveal';
import { GlobalSpotlight } from '../animated/MagicBento';

interface ProjectsSectionProps {
  className?: string;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ className = '' }) => {
  const gridRef = useRef<HTMLDivElement>(null);
  
  // Updated with user-provided live and GitHub links
  const projects = [
    {
      id: '1',
      title: 'MedSecure – HIPAA-Compliant Medical Records Platform',
      description: 'Built secure healthcare platform with role-based access control (RBAC), JWT authentication, and encrypted data storage. Architected normalized relational database schema with optimized queries for efficient data retrieval.',
      tech: ['Next.js 15', 'TypeScript', 'PostgreSQL', 'JWT', 'RBAC', 'Security'],
      github: 'https://github.com/Shresth-Senwal/Med-Secure',
      demo: undefined,
    },
    {
      id: '2',
      title: 'N.E.W.S – IoT Health Monitoring System',
      description: 'Grand Finalist - SIH 2025. Developed distributed system processing real-time sensor data from 50+ IoT devices with 99.9% uptime. Implemented ETL pipelines using Python to process water quality data, enabling predictive analytics for disease detection.',
      tech: ['React', 'Python', 'LoRaWAN', 'XGBoost', 'IoT', 'ETL', 'MongoDB Atlas'],
      github: undefined,
      demo: undefined,
    },
    {
      id: '3',
      title: 'Legally AI – Legal Research Automation Tool',
      description: 'Engineered document processing system using NLP and LLMs, reducing case research time by 70%. Built scalable RESTful API with rate limiting and caching mechanisms for concurrent requests.',
      tech: ['Python', 'NLP', 'OpenAI API', 'LLM', 'RESTful APIs', 'Legal Tech'],
      github: 'https://github.com/Shresth-Senwal/legally-assist-ai',
      demo: 'https://legally-assist-ai.vercel.app/',
    },
    {
      id: '4',
      title: 'Prism – AI-Powered Topic Analysis Platform',
      description: 'Developed an AI-based platform that aggregates and analyzes digital content, delivering insights, trends, and diverse perspectives in a user-friendly interface.',
      tech: ['AI/ML', 'Content Analysis', 'Data Analytics', 'Machine Learning'],
      github: 'https://github.com/Shresth-Senwal/prism-app',
      demo: 'https://prism-app-nine.vercel.app/',
    },
    {
      id: '5',
      title: 'Fintrack – GenZ Finance Management',
      description: 'Built a modern, AI-powered personal finance app for Gen Z with gamified savings, real-time analytics, secure auth, and a mobile-first UI. Winner - Best Tech Category at Nebula Nexus Hackathon.',
      tech: ['AI/ML', 'React', 'Real-time Analytics', 'Mobile-First', 'Finance Tech'],
      github: 'https://github.com/Shresth-Senwal/fintrack-genz-vision',
      demo: 'https://fintrack-genz-vision.vercel.app/',
    },
    {
      id: '6',
      title: 'IEEE RAS MUJ Website',
      description: 'Developed the official website for IEEE Robotics and Automation Society - Manipal University Jaipur, featuring modern design and comprehensive event management.',
      tech: ['React', 'Modern Design', 'Event Management', 'Web Development'],
      github: 'https://github.com/Shresth-Senwal/pixel-palettes-pls',
      demo: 'https://ieeerasmuj.com/',
    },
    {
      id: '7',
      title: 'Pixel Palettes – Hackathon Website',
      description: 'Created a dedicated hackathon event website for Pixel Palettes, featuring dynamic registration, event details, and participant management systems.',
      tech: ['React', 'Registration System', 'Event Management', 'Hackathon Platform'],
      github: 'https://github.com/Shresth-Senwal/pixel-palettes-pls',
      demo: 'https://www.ieeerasmuj.com/pixelpalettes/',
    },
    // Removed MCP Enabled AEMT per user request
    {
      id: '9',
      title: 'Hybrid VTOL Drone',
      description: 'Led the design and ongoing development of a VTOL drone with unique transformation capabilities; participated in patent filing and fostered learning about aerospace systems.',
      tech: ['Robotics', 'UAV Design', 'Aerospace Engineering', 'Hardware Integration'],
      github: undefined,
      demo: undefined,
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
      <section id="projects" className={`py-8 sm:py-12 lg:py-16 ${className}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div 
            className="text-center mb-8 sm:mb-10 md:mb-12"
          >
            <ScrollReveal
              containerClassName="text-center"
              textClassName="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-portfolio-purple to-portfolio-accent px-2"
              delay={0.4}
            >
              Projects & Creations
            </ScrollReveal>
            <ScrollReveal
              baseOpacity={0.1}
              baseRotation={-0.5}
              blurStrength={3}
              containerClassName="text-center"
              textClassName="text-gray-300 text-base sm:text-lg max-w-4xl mx-auto leading-relaxed px-2"
              delay={0.4}
            >
              A showcase of innovative solutions and creative implementations across various technologies, 
              featuring full-stack applications, AI integrations, and secure enterprise platforms.
            </ScrollReveal>
          </div>

          {/* Projects Grid */}
          <div ref={gridRef} className="bento-section grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {projects.map((project, index) => (
              <div key={project.id} className="card">
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  tech={project.tech}
                  github={project.github}
                  demo={project.demo}
                  className="h-full"
                  delay={1.6 + (index * 0.2)}
                />
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