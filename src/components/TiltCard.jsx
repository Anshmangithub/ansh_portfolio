import { motion } from "framer-motion";
import { useTilt } from "../hooks/useTilt.js";

// A 3D-tilting card shell used across projects, experience, services and
// skills so the whole site reacts in the same "3D" language, not just the hero.
const TiltCard = ({
  children,
  as: Component = "div",
  className = "",
  delay = 0,
  glow = "rgba(251,191,36,0.12)",
  ...props
}) => {
  const { ref, onMouseMove, onMouseLeave } = useTilt();

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay }}
      style={{ perspective: "1000px" }}
    >
      <Component
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-transform duration-150 ease-out will-change-transform ${className}`}
        style={{
          transform: "rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))",
          transformStyle: "preserve-3d",
        }}
        {...props}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(400px circle at var(--mx, 50%) var(--my, 50%), ${glow}, transparent 60%)`,
          }}
        />
        {children}
      </Component>
    </motion.div>
  );
};

export default TiltCard;
