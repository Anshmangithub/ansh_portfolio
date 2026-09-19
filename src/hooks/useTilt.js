import { useRef } from "react";

// Shared cursor-tilt behavior for cards (project, experience, service, skill).
// Sets CSS custom properties the consuming component reads for its
// rotateX/rotateY transform and its cursor-following glow position.
export function useTilt(max = 10) {
  const ref = useRef(null);

  const onMouseMove = (event) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    el.style.setProperty("--rx", `${(-y * max).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${(x * max * 1.2).toFixed(2)}deg`);
    el.style.setProperty("--mx", `${((x + 0.5) * 100).toFixed(1)}%`);
    el.style.setProperty("--my", `${((y + 0.5) * 100).toFixed(1)}%`);
  };

  const onMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return { ref, onMouseMove, onMouseLeave };
}
