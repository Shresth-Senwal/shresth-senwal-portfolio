import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface CountUpProps {
  end: number;
  duration?: number;
  className?: string;
  suffix?: string;
  prefix?: string;
}

export const CountUp: React.FC<CountUpProps> = ({
  end,
  duration = 2,
  className = '',
  suffix = '',
  prefix = ''
}) => {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    const startValue = 0;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);

      const currentCount = Math.floor(
        startValue + (end - startValue) * easeOutCubic(progress)
      );

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

  return (
    <motion.div
      ref={ref}
      className={`text-4xl font-bold ${className}`}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <span className="portfolio-gradient-text">
        {prefix}{count}{suffix}
      </span>
    </motion.div>
  );
};