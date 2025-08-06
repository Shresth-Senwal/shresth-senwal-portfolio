import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Spark {
  id: number;
  x: number;
  y: number;
}

interface ClickSparkProps {
  children: React.ReactNode;
  className?: string;
}

export const ClickSpark: React.FC<ClickSparkProps> = ({ children, className = '' }) => {
  const [sparks, setSparks] = useState<Spark[]>([]);
  const [nextId, setNextId] = useState(0);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const newSpark: Spark = {
        id: nextId,
        x: e.clientX,
        y: e.clientY,
      };

      setSparks(prev => [...prev, newSpark]);
      setNextId(prev => prev + 1);

      // Remove spark after animation
      setTimeout(() => {
        setSparks(prev => prev.filter(spark => spark.id !== newSpark.id));
      }, 600);
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [nextId]);

  const sparkVariants = {
    initial: { scale: 0, opacity: 1 },
    animate: { 
      scale: [0, 1.2, 0], 
      opacity: [1, 0.8, 0]
    },
    exit: { opacity: 0 }
  };

  return (
    <div className={className}>
      {children}
      <div className="fixed inset-0 pointer-events-none z-40">
        <AnimatePresence>
          {sparks.map((spark) => (
            <motion.div
              key={spark.id}
              className="absolute"
              style={{
                left: spark.x,
                top: spark.y,
                transform: 'translate(-50%, -50%)',
              }}
              variants={sparkVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="relative">
                {/* Central spark */}
                <div className="w-2 h-2 bg-white rounded-full absolute" />
                {/* Radiating particles */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-gradient-to-r from-portfolio-purple to-portfolio-cyan rounded-full"
                    style={{
                      left: '50%',
                      top: '50%',
                    }}
                    animate={{
                      x: [0, Math.cos(i * 45 * Math.PI / 180) * 20],
                      y: [0, Math.sin(i * 45 * Math.PI / 180) * 20],
                      opacity: [1, 0],
                      scale: [1, 0],
                    }}
                    transition={{
                      duration: 0.6,
                      ease: "easeOut",
                    }}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};