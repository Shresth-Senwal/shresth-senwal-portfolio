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
  // Projects with live demos displayed first
  const projects = [
    {
      id: '3',
      title: 'PolyPact: Multimodal AI Paralegal Platform',
      description: 'PolyPact is a state-of-the-art multimodal AI Paralegal Platform designed to revolutionize legal reasoning and case management. Built with a focus on efficiency, security, and ultra-high performance, it utilizes a state-driven "Case Container" model to provide isolated legal contexts and automated legal intelligence.',
      tech: ['Vision AI', 'Gemini 3.1', 'Cydonia 24B', 'RAG', 'Neural Graph', 'Legal Tech'],
      github: 'https://github.com/Shresth-Senwal/Polypact',
      demo: 'https://lexis-ai-iota.vercel.app/',
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
    {
      id: '10',
      title: 'Flagr – AI-Driven Document Analysis Platform',
      description: 'Modern AI-driven document analysis and chat platform built with React and TypeScript. Unifies intelligent document processing with a natural language conversational interface, allowing users to seamlessly query documents and instantly flags suspicious or risky content within contracts.',
      tech: ['React', 'TypeScript', 'AI/ML', 'Document Processing', 'NLP', 'Contract Analysis'],
      github: undefined,
      demo: 'https://flagr.vercel.app/',
    },
    {
      id: '11',
      title: 'ALERT-AID – Disaster Prediction & Alert System',
      description: 'Production-ready disaster prediction and alert system with React, TypeScript, and ML. Features interactive 3D globe, real-time weather monitoring, and intelligent risk assessment for proactive emergency response.',
      tech: ['React', 'TypeScript', 'Machine Learning', '3D Visualization', 'Real-time Monitoring', 'Risk Assessment'],
      github: undefined,
      demo: 'https://alert-aid.vercel.app/',
    },
    {
      id: '12',
      title: 'SACH.AI – Intelligent Food Analyzer',
      description: 'An intelligent food analyzer that uses AI to provide personalized dietary insights. Focused on an AI-native experience, featuring real-time streaming and a generative UI for intuitive health tracking.',
      tech: ['AI/ML', 'Real-time Streaming', 'Generative UI', 'Mobile App', 'Dietary Analysis'],
      github: undefined,
      demo: 'https://truth-pulse-seven.vercel.app/',
    },
    {
      id: '13',
      title: 'RESQ – Emergency Response Platform',
      description: 'Production-ready emergency response platform for real-time incident coordination. Built with React, TypeScript, Supabase, and Leaflet, connecting citizens, emergency responders, and resources in critical moments.',
      tech: ['React', 'TypeScript', 'Supabase', 'Leaflet', 'Real-time Coordination', 'Emergency Response'],
      github: undefined,
      demo: 'https://res-q-f.vercel.app/',
    },
    {
      id: '14',
      title: 'DJEDOPS – Blockchain Monitoring Platform',
      description: 'Mission-critical monitoring platform for Djed algorithmic stablecoin protocol on Ergo blockchain. Features live blockchain data, 3D visualizations, and automated risk management with Financial Brutalism design.',
      tech: ['Blockchain', 'Ergo', 'Real-time Monitoring', '3D Visualization', 'DeFi', 'Risk Management'],
      github: undefined,
      demo: 'https://djed-ops.vercel.app/',
    },
    {
      id: '15',
      title: 'FLOWKEY – AI System Design Generator',
      description: 'Flowkey is an AI-powered platform that enables the generation of complete system designs from a single prompt, streamlining the system architecture process.',
      tech: ['AI/ML', 'System Design', 'Architecture Generation', 'Automation', 'Developer Tools'],
      github: undefined,
      demo: 'https://flow-key-iota.vercel.app/',
    },
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