import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import RippleGrid from '@/components/animated/RippleGrid';
import SplashCursor from '@/components/animated/SplashCursor';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      {/* Global background grid */}
      <RippleGrid
        enableRainbow={false}
        gridColor="#ffffff"
        rippleIntensity={0.05}
        gridSize={10}
        gridThickness={15}
        mouseInteraction={true}
        mouseInteractionRadius={1.2}
        opacity={0.8}
      />
      {/* Global cursor effects */}
      <SplashCursor SPLAT_RADIUS={0.08} SPLAT_FORCE={3000} />
      <div className="relative z-10 w-full flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
          <a href="/" className="text-blue-500 hover:text-blue-700 underline">
            Return to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
