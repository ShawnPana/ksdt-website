import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook to track the current viewport dimensions.
 * @returns An object containing the current width and height in pixels: { width, height }.
 */
const useWindowSize = () => {
  // Initialize state with current window size, checking for server-side rendering (SSR)
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  const handleResize = useCallback(() => {
    if (typeof window !== 'undefined') {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Set initial size immediately upon mounting
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  return windowSize;
};

export default useWindowSize;