/**
 * Responsive Design Utilities
 * 
 * This module provides utilities for automatic resolution scaling and mobile-friendly interactions
 */

export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export type Breakpoint = keyof typeof breakpoints;

/**
 * Check if current viewport matches a breakpoint
 */
export const useBreakpoint = (breakpoint: Breakpoint): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= breakpoints[breakpoint];
};

/**
 * Get responsive font size based on viewport
 */
export const getResponsiveFontSize = (
  base: number,
  scale: number = 0.8
): string => {
  if (typeof window === 'undefined') return `${base}px`;
  
  const width = window.innerWidth;
  const scaleFactor = Math.max(scale, Math.min(1.2, width / 1024));
  return `${Math.round(base * scaleFactor)}px`;
};

/**
 * Get responsive spacing based on viewport
 */
export const getResponsiveSpacing = (
  base: number,
  scale: number = 0.75
): string => {
  if (typeof window === 'undefined') return `${base}px`;
  
  const width = window.innerWidth;
  if (width < breakpoints.sm) return `${Math.round(base * scale)}px`;
  if (width < breakpoints.md) return `${Math.round(base * 0.9)}px`;
  return `${base}px`;
};

/**
 * Mobile-friendly touch target size (minimum 44px)
 */
export const getTouchTargetSize = (size: number): number => {
  return Math.max(44, size);
};

/**
 * Responsive class name utilities
 */
export const responsiveClasses = {
  // Text sizes
  textSm: 'text-sm sm:text-base',
  textBase: 'text-base sm:text-lg',
  textLg: 'text-lg sm:text-xl',
  textXl: 'text-xl sm:text-2xl',
  text2xl: 'text-2xl sm:text-3xl md:text-4xl',
  text3xl: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl',
  text4xl: 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl',
  text5xl: 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl',
  
  // Spacing
  paddingSm: 'p-2 sm:p-3',
  paddingBase: 'p-3 sm:p-4',
  paddingLg: 'p-4 sm:p-5 md:p-6',
  paddingXl: 'p-6 sm:p-8 md:p-10',
  
  marginSm: 'm-2 sm:m-3',
  marginBase: 'm-3 sm:m-4',
  marginLg: 'm-4 sm:m-6 md:m-8',
  marginXl: 'm-6 sm:m-8 md:m-12',
  
  // Gaps
  gapSm: 'gap-2 sm:gap-3',
  gapBase: 'gap-3 sm:gap-4',
  gapLg: 'gap-4 sm:gap-6 md:gap-8',
  gapXl: 'gap-6 sm:gap-8 md:gap-12',
  
  // Container
  container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  containerSm: 'max-w-4xl mx-auto px-4 sm:px-6',
  containerLg: 'max-w-6xl mx-auto px-4 sm:px-6 lg:px-8',
  
  // Touch targets
  touchTarget: 'min-h-[44px] min-w-[44px] touch-manipulation',
  
  // Grid responsive
  gridCols1: 'grid-cols-1',
  gridCols2: 'grid-cols-1 lg:grid-cols-2',
  gridCols3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  gridCols4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  
  // Flex responsive
  flexCol: 'flex flex-col',
  flexRow: 'flex flex-col sm:flex-row',
  flexWrap: 'flex flex-wrap',
  
  // Section spacing
  sectionSm: 'py-8 sm:py-12',
  sectionBase: 'py-8 sm:py-12 lg:py-16',
  sectionLg: 'py-12 sm:py-16 lg:py-20',
} as const;

/**
 * Check if device is mobile based on user agent and screen size
 */
export const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const userAgent = navigator.userAgent;
  const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  const isSmallScreen = window.innerWidth < breakpoints.md;
  
  return isMobileUA || isSmallScreen;
};

/**
 * Add responsive event listeners for dynamic adjustments
 */
export const addResponsiveListeners = (callback: () => void) => {
  if (typeof window === 'undefined') return () => {};
  
  const mediaQueries = Object.entries(breakpoints).map(([key, value]) => {
    const mq = window.matchMedia(`(min-width: ${value}px)`);
    mq.addEventListener('change', callback);
    return mq;
  });
  
  // Cleanup function
  return () => {
    mediaQueries.forEach(mq => {
      mq.removeEventListener('change', callback);
    });
  };
};
