/**
 * @file src/components/animated/ScrollReveal.tsx
 * @description One-time text animation component that reveals text on initial load.
 * @summary This component uses GSAP to animate text content once when the website loads. It reveals words with a combination of rotation, opacity, blur effects, and y-axis movement, then becomes static.
 *
 * @dependencies
 * - react: For component creation and hooks (useEffect, useRef, useMemo).
 * - gsap: For creating the animations.
 *
 * @props
 * @prop {ReactNode} children - The text content to be animated.
 * @prop {boolean} [enableBlur=true] - Whether to apply a blur effect during the animation.
 * @prop {number} [baseOpacity=0.1] - The starting opacity of the words before they are revealed.
 * @prop {number} [baseRotation=3] - The starting rotation (in degrees) of the container.
 * @prop {number} [blurStrength=4] - The strength of the blur effect (in pixels).
 * @prop {string} [containerClassName=""] - Additional CSS classes for the main container element.
 * @prop {string} [textClassName=""] - Additional CSS classes for the paragraph element wrapping the text.
 * @prop {number} [delay=0] - Delay before the animation starts (in seconds).
 *
 * @returns {React.FC<ScrollRevealProps>} A React functional component.
 */
import React, { useEffect, useRef, useMemo, ReactNode } from "react";
import { gsap } from "gsap";

/**
 * @interface ScrollRevealProps
 * @description Defines the props for the ScrollReveal component.
 */
interface ScrollRevealProps {
  /** The text content to be animated. */
  children: ReactNode;
  /** Whether to apply a blur effect during the animation. */
  enableBlur?: boolean;
  /** The starting opacity of the words before they are revealed. */
  baseOpacity?: number;
  /** The starting rotation (in degrees) of the container. */
  baseRotation?: number;
  /** The strength of the blur effect (in pixels). */
  blurStrength?: number;
  /** Additional CSS classes for the main container element. */
  containerClassName?: string;
  /** Additional CSS classes for the paragraph element wrapping the text. */
  textClassName?: string;
  /** Delay before the animation starts (in seconds). */
  delay?: number;
}

/**
 * @component ScrollReveal
 * @description A component that animates text into view once when the website loads.
 * It splits the children text into individual words and animates them using GSAP.
 * Effects include rotation of the whole text block, and per-word fade-in, blur reduction, and y-axis movement.
 * After the animation completes, the text becomes static.
 *
 * @example
 * ```tsx
 * import ScrollReveal from './ScrollReveal';
 *
 * <ScrollReveal baseOpacity={0} enableBlur={true} baseRotation={5} blurStrength={10}>
 *   Your animated text goes here.
 * </ScrollReveal>
 * ```
 */
const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = "",
  textClassName = "",
  delay = 0.4,
}) => {
  const containerRef = useRef<HTMLHeadingElement>(null);

  /**
   * Memoized computation that splits the children string into words wrapped in spans.
   * This is necessary to animate each word individually.
   * It handles whitespace correctly by preserving it.
   * A "word" class is added to each word's span for GSAP to target.
   * @returns {Array<ReactNode>} An array of strings and React elements (spans for words).
   */
  const splitText = useMemo(() => {
    // Ensure children is a string for splitting.
    const text = typeof children === "string" ? children : "";
    // Split by whitespace, but keep the whitespace as elements in the array.
    return text.split(/(\s+)/).map((word, index) => {
      // If the part is just whitespace, return it as is.
      if (word.match(/^\s+$/)) return word;
      // Wrap each word in a span to allow for individual animation.
      // The 'word' class is crucial for the GSAP animation selectors.
      return (
        <span className="inline-block word" key={index}>
          {word}
        </span>
      );
    });
  }, [children]);

  /**
   * useEffect hook to set up the one-time GSAP animations.
   * This runs once when the component mounts and animates the text into view.
   */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Animation for the rotation of the entire text container.
    gsap.fromTo(
      el,
      { transformOrigin: "0% 50%", rotate: baseRotation },
      {
        ease: "power2.out",
        rotate: 0,
        duration: 0.6,
        delay: delay,
      }
    );

    // Select all the word elements to be animated.
    const wordElements = el.querySelectorAll<HTMLElement>(".word");

    // Animation for the opacity and y-axis movement of each word.
    gsap.fromTo(
      wordElements,
      { 
        opacity: baseOpacity, 
        y: 20,
        willChange: "opacity, transform" 
      },
      {
        ease: "power2.out",
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.5,
        delay: delay + 0.1,
      }
    );

    // Conditional animation for the blur effect on each word.
    if (enableBlur) {
      gsap.fromTo(
        wordElements,
        { filter: `blur(${blurStrength}px)` },
        {
          ease: "power2.out",
          filter: "blur(0px)",
          stagger: 0.1,
          duration: 0.5,
          delay: delay + 0.1,
        }
      );
    }
  }, [enableBlur, baseRotation, baseOpacity, blurStrength, delay]);

  return (
    <h2 ref={containerRef} className={`my-5 ${containerClassName}`}>
      <p
        className={`text-[clamp(1.6rem,4vw,3rem)] leading-[1.5] font-semibold ${textClassName}`}
      >
        {splitText}
      </p>
    </h2>
  );
};

export default ScrollReveal;