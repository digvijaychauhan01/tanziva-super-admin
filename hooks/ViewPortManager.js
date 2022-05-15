import { useState, useEffect } from "react";
import config from "../config";

/**
 * Hook to the window resize event handler
 * @returns Window's  height and width as windowSize
 */
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
    isMobile: false,
    isTablet: false,
    isDesktop: false
  });

  // Handler to call on window resize
  function handleResize() {
    let isMobile = false;
    let isTablet = false;
    let isDesktop = false;
    const { innerWidth } = window;

    // Set window width/height to state
    if (innerWidth >= config.viewports.$xlvp) {
      isMobile = false;
      isTablet = false;
      isDesktop = true;
    } else if (innerWidth >= config.viewports.$svp) {
      isMobile = false;
      isTablet = true;
      isDesktop = false;
    } else if (innerWidth >= config.viewports.$xxsvp) {
      isMobile = true;
      isTablet = false;
      isDesktop = false;
    } else {
      isMobile = true;
      isTablet = false;
      isDesktop = false;
    }
    
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
      isMobile: isMobile,
      isTablet: isTablet,
      isDesktop: isDesktop
    });
  }

  useEffect(() => {
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return windowSize;
}

export { useWindowSize };