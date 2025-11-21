"use client";

import { useEffect } from "react";

export default function ViewportHeightFix() {
  useEffect(() => {
    // Check if dvh is supported
    const supportsDvh = CSS.supports('height', '100dvh');
    
    if (!supportsDvh) {
      // Fallback for older browsers
      const updateViewportHeight = () => {
        document.documentElement.style.setProperty(
          '--viewport-height', 
          `${window.innerHeight}px`
        );
      };
      
      // Set initial value
      updateViewportHeight();
      
      // Update on resize and orientation change
      window.addEventListener('resize', updateViewportHeight);
      window.addEventListener('orientationchange', updateViewportHeight);
      
      // Cleanup
      return () => {
        window.removeEventListener('resize', updateViewportHeight);
        window.removeEventListener('orientationchange', updateViewportHeight);
      };
    }
  }, []);

  return null;
}