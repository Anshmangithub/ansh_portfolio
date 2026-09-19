import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "../lib/gsap.js";
import { setLenisInstance } from "../lib/lenisInstance.js";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion.js";

// Drives smooth scrolling site-wide and keeps GSAP ScrollTrigger's internal
// scroll position in sync with it. Fully skipped under reduced-motion —
// native scroll behavior takes over instead.
const SmoothScroll = ({ children }) => {
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return undefined;

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    setLenisInstance(lenis);

    lenis.on("scroll", ScrollTrigger.update);

    const tickerCallback = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      setLenisInstance(null);
    };
  }, [reducedMotion]);

  return children;
};

export default SmoothScroll;
