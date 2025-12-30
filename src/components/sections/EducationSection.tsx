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
    'Relevant Coursework: IoT Systems, Database Management Systems, Operating Systems, Software Engineering, Object-Oriented Programming, Computer Networks, Distributed Systems',
    'IEEE RAS (Robotics and Automation Society) Member',
    'Technical Secretary, IEEE RAS MUJ (May 2025 – Present)',
    'Head of UAV Design, IEEE RAS MUJ (July 2024 – May 2025)',
    'AI/ML Engineering Intern at Innominds (May 2025 – Present)',
    'Grand Finalist - Smart India Hackathon (SIH) 2025 (Top 0.1% nationwide)',
    'Winner, Best Technical Implementation – Nebula Nexus Hackathon',
    'Finalist – Hacks by ACM MUJ',
    'Finalist – Hackerzstreet by IEEE CS'
  ];

  import React from 'react';

  interface EducationSectionProps {
    className?: string;
  }

  // EducationSection removed per user request. Exporting a no-op component
  // so imports remain valid but nothing is rendered.
  export const EducationSection: React.FC<EducationSectionProps> = () => {
    return null;
  };

  export default EducationSection;