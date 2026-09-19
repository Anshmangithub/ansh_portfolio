import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion.js";

const STEPS = ["INITIALIZING EXPERIENCE", "LOADING 3D ASSETS", "CONNECTING SYSTEM", "READY"];
const SESSION_KEY = "ag-portfolio-booted";

const BootLoader = () => {
  const reducedMotion = usePrefersReducedMotion();
  // Decided once, in a lazy initializer, rather than re-checked inside the
  // effect: React 18 StrictMode runs effects (mount → cleanup → mount) twice
  // in dev, and re-reading sessionStorage on that second run would see the
  // flag the first run already wrote, bail out, and leave `visible` stuck
  // true forever with no hide-timer left to clear it.
  const [shouldBoot] = useState(() => {
    if (typeof window === "undefined" || sessionStorage.getItem(SESSION_KEY)) return false;
    sessionStorage.setItem(SESSION_KEY, "1");
    return true;
  });
  const [visible, setVisible] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    if (reducedMotion || !shouldBoot) return undefined;

    setVisible(true);
    setStepIndex(0);

    const stepDuration = 380;
    const timers = STEPS.map((_, i) =>
      setTimeout(() => setStepIndex(i), i * stepDuration)
    );
    const hideTimer = setTimeout(() => setVisible(false), STEPS.length * stepDuration + 350);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(hideTimer);
    };
  }, [reducedMotion, shouldBoot]);

  const progress = ((stepIndex + 1) / STEPS.length) * 100;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-[#050506]"
        >
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-cyan-300/80">
            {STEPS.map((step, i) => (
              <span key={step} className={i <= stepIndex ? "text-cyan-300" : "text-neutral-700"}>
                {String(i + 1).padStart(2, "0")}
              </span>
            ))}
          </div>

          <p className="mt-4 font-mono text-sm text-neutral-400">
            <AnimatePresence mode="wait">
              <motion.span
                key={STEPS[stepIndex]}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
              >
                {STEPS[stepIndex]}
                {stepIndex < STEPS.length - 1 && <span className="animate-pulse-glow">...</span>}
              </motion.span>
            </AnimatePresence>
          </p>

          <div className="mt-6 h-px w-48 overflow-hidden bg-white/10">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-300 via-emerald-300 to-amber-300"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BootLoader;
