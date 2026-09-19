import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap.js";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion.js";

// Wraps any element so it pulls gently toward the cursor on hover — used on
// primary CTAs and nav items for the "magnetic button" interaction.
const MagneticButton = ({ as: Component = "div", strength = 0.35, className = "", children, ...props }) => {
  const ref = useRef(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return undefined;
    const el = ref.current;
    if (!el) return undefined;

    const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      xTo(relX * strength);
      yTo(relY * strength);
    };

    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [reducedMotion, strength]);

  return (
    <Component ref={ref} className={`inline-block will-change-transform ${className}`} {...props}>
      {children}
    </Component>
  );
};

export default MagneticButton;
