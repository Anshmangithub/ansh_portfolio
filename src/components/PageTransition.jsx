import { motion } from "framer-motion";

const variants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -16, transition: { duration: 0.3, ease: "easeIn" } },
};

const PageTransition = ({ children, fullBleed = false }) => (
  <motion.main
    variants={variants}
    initial="initial"
    animate="animate"
    exit="exit"
    className={
      fullBleed
        ? "relative z-10 min-h-screen w-full"
        : "relative z-10 mx-auto min-h-screen w-full max-w-6xl px-6 pt-32 lg:px-10"
    }
  >
    {children}
  </motion.main>
);

export default PageTransition;
