/**
 * ScrollStack Component
}

export const ScrollStack: React.FC<ScrollStackProps> = ({
export default ScrollStack;
 * Lenis scrolling, progressive scaling, and customizable animations.
 * 
 * Features:
 * - Smooth Lenis scrolling with custom easing
 * - Progressive card stacking with scale and rotation
 * - Blur effects for depth perception
 * - Customizable positioning and animation parameters
 * - Performance optimized with RAF and transform caching
 * 
 * Usage:
 * import ScrollStack, { ScrollStackItem } from './ScrollStack'
 * 
 * <ScrollStack>
 *   <ScrollStackItem>
 *     <h2>Card 1</h2>
 *     <p>This is the first card in the stack</p>
 *   </ScrollStackItem>
 *   <ScrollStackItem>
 *     <h2>Card 2</h2>
 *     <p>This is the second card in the stack</p>
 *   </ScrollStackItem>
 * </ScrollStack>
 */

import React, { ReactNode, useLayoutEffect, useRef, useCallback } from "react";
import Lenis from "lenis";

export interface ScrollStackItemProps {
  itemClassName?: string;
  children: ReactNode;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({
  children,
  itemClassName = "",
}) => (
  <div
    className={`scroll-stack-card relative w-full h-80 p-6 rounded-2xl box-border will-change-transform bg-gradient-to-br from-[#2d1846] to-[#3a215a] border border-portfolio-purple/40 backdrop-blur-sm ${itemClassName}`.trim()}
    style={{
      backfaceVisibility: "hidden",
      transformStyle: "preserve-3d",
      transition: 'all 0.4s ease',
      color: '#fff',
      boxShadow: '0 4px 24px rgba(132, 0, 255, 0.10)',
    }}
  >
    {children}
  </div>
);

interface ScrollStackProps {
  className?: string;
  children: ReactNode;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
  scaleDuration?: number;
  rotationAmount?: number;
  blurAmount?: number;
  onStackComplete?: () => void;
}

const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = "",
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = "20%",
  scaleEndPosition = "10%",
  baseScale = 0.85,
  scaleDuration = 0.5,
  rotationAmount = 0,
  blurAmount = 0,
  onStackComplete,
}) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const stackCompletedRef = useRef(false);
  const cardsRef = useRef<HTMLElement[]>([]);
  const currentCardRef = useRef(0);
  const wheelThrottleRef = useRef(false);
  const isAnimatingRef = useRef(false);
  const originalBodyOverflow = useRef<string>('');
  const isHoveringRef = useRef(false);

  const calculateProgress = useCallback((scrollTop: number, start: number, end: number) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const parsePercentage = useCallback((value: string | number, containerHeight: number) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value as string);
  }, []);

  // Update card transforms based on current card index
  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length || isAnimatingRef.current) return;

    isAnimatingRef.current = true;

    const totalCards = cardsRef.current.length;
    const currentCard = currentCardRef.current;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      
      // Small stacking offset to show depth like in the image
      const stackY = i * 3;
      const stackX = i * 2;
      const stackRotation = i * 0.5;
      
      // Determine card state
      const shouldFlyOut = i < currentCard;
      const isCurrentCard = i === currentCard;
      const isFutureCard = i > currentCard;
      
      let finalTranslateY = stackY;
      let finalTranslateX = stackX;
      let finalRotation = stackRotation;
      let scale = 0.94; // Reduced base scale to prevent border cutoff
      let opacity = 0.7;
      let blur = i === 0 ? 0 : 3; // Increased blur for older cards
      
      if (shouldFlyOut) {
        // Elegantly hide older cards with better scaling
        finalTranslateY = stackY - 140;
        finalTranslateX = stackX + (i % 2 === 0 ? -100 : 100);
        finalRotation = stackRotation + (i % 2 === 0 ? -20 : 20);
        scale = 0.85; // Increased scale to prevent border cutoff
        opacity = 0.25;
        blur = 4; // Increased blur for flown out cards
        card.style.boxShadow = '0 8px 25px rgba(132, 0, 255, 0.1)';
      } else if (isCurrentCard) {
        // Current card (highlighted and fully readable) - conservative scaling
        scale = 0.98; // Reduced from 1.02 to prevent border cutoff
        opacity = 1.0;
        blur = 0;
        finalTranslateY = stackY - 12; // Subtle lift
        // Enhanced glow with professional look
        card.style.boxShadow = '0 20px 60px rgba(132, 0, 255, 0.25), 0 0 0 1px rgba(132, 0, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.15)';
      } else if (isFutureCard) {
        // Future cards with better visibility gradient
        scale = 0.94; // Slightly reduced to prevent cutoff
        opacity = Math.max(0.5, 0.9 - (i - currentCard) * 0.08);
        blur = Math.min(5, (i - currentCard) * 1.2); // Increased blur progression for future cards
        card.style.boxShadow = '0 8px 25px rgba(132, 0, 255, 0.08)';
      }

      card.style.transform = `translateY(${finalTranslateY}px) translateX(${finalTranslateX}px) scale(${scale}) rotateZ(${finalRotation}deg)`;
      card.style.filter = `blur(${blur}px)`;
      card.style.opacity = `${opacity}`;
      card.style.zIndex = `${totalCards - i}`;
      card.style.transition = 'transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 0.7s ease, opacity 0.7s ease, box-shadow 0.7s ease';
    });

    // Check if completed
    if (currentCard >= totalCards) {
      if (!stackCompletedRef.current && onStackComplete) {
        stackCompletedRef.current = true;
        onStackComplete();
      }
    }

    setTimeout(() => {
      isAnimatingRef.current = false;
    }, 100);
  }, [onStackComplete]);

  // Handle wheel events
  const handleWheel = useCallback((e: WheelEvent) => {
    if (wheelThrottleRef.current || isAnimatingRef.current) return;
    
    // Only handle wheel events if hovering over the stack
    if (!isHoveringRef.current) {
      return; // Let the main page handle scrolling
    }
    
    e.preventDefault();
    e.stopPropagation();
    wheelThrottleRef.current = true;
    
    const totalCards = cardsRef.current.length;
    
    if (e.deltaY > 0) {
      // Scroll down - advance to next card
      if (currentCardRef.current < totalCards) {
        currentCardRef.current++;
        updateCardTransforms();
      }
    } else {
      // Scroll up - go back to previous card
      if (currentCardRef.current > 0) {
        currentCardRef.current--;
        stackCompletedRef.current = false;
        updateCardTransforms();
      }
    }
    
    setTimeout(() => {
      wheelThrottleRef.current = false;
    }, 400);
  }, [updateCardTransforms]);

  // Handle mouse enter/leave for hover detection
  const handleMouseEnter = useCallback(() => {
    isHoveringRef.current = true;
    // Pause main website scrolling when hovering
    if (originalBodyOverflow.current === '') {
      originalBodyOverflow.current = document.body.style.overflow || 'auto';
      document.body.style.overflow = 'hidden';
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    isHoveringRef.current = false;
    // Re-enable main website scrolling when not hovering
    if (originalBodyOverflow.current !== '') {
      document.body.style.overflow = originalBodyOverflow.current;
      originalBodyOverflow.current = '';
    }
  }, []);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(scroller.querySelectorAll(".scroll-stack-card")) as HTMLElement[];
    cardsRef.current = cards;

    cards.forEach((card, i) => {
      card.style.position = 'absolute';
      card.style.margin = '0';
      card.style.top = '0';
      card.style.left = '0';
      card.style.right = '0';
      card.style.willChange = 'transform, filter';
      card.style.transformOrigin = 'center center';
      card.style.backfaceVisibility = 'hidden';
      card.style.perspective = '1000px';
      card.style.webkitPerspective = '1000px';
      card.style.zIndex = `${cards.length - i}`;
    });

    // Add event listeners
    scroller.addEventListener('wheel', handleWheel, { passive: false });
    scroller.addEventListener('mouseenter', handleMouseEnter);
    scroller.addEventListener('mouseleave', handleMouseLeave);

    // Initial render
    updateCardTransforms();

    return () => {
      scroller.removeEventListener('wheel', handleWheel);
      scroller.removeEventListener('mouseenter', handleMouseEnter);
      scroller.removeEventListener('mouseleave', handleMouseLeave);
      stackCompletedRef.current = false;
      cardsRef.current = [];
      currentCardRef.current = 0;
      isAnimatingRef.current = false;
      wheelThrottleRef.current = false;
      isHoveringRef.current = false;
      // Restore main website scrolling on cleanup
      if (originalBodyOverflow.current !== '') {
        document.body.style.overflow = originalBodyOverflow.current;
        originalBodyOverflow.current = '';
      }
    };
  }, [handleWheel, handleMouseEnter, handleMouseLeave, updateCardTransforms]);

  return (
    <div
      className={`relative w-full ${className}`.trim()}
      ref={scrollerRef}
      style={{
        background: 'transparent',
        height: '600px',
        userSelect: 'none',
      }}>
      <div className="relative w-full h-full flex flex-col items-center justify-center">
        <div className="w-full max-w-md mx-auto relative" style={{ height: '320px' }}>
          {children}
        </div>
      </div>
    </div>
  );
}

export { ScrollStack };
export default ScrollStack;
