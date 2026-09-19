import { motion } from "framer-motion";

const SectionHeading = ({ eyebrow, index, title, description, align = "left" }) => (
  <div className={align === "center" ? "text-center" : "text-left"}>
    {eyebrow && (
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-amber-300/80"
        style={align === "center" ? { justifyContent: "center" } : undefined}
      >
        {index && <span className="text-cyan-300/60">{index}</span>}
        <span aria-hidden="true">{"//"}</span>
        {eyebrow}
      </motion.p>
    )}
    <motion.h2
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.05 }}
      className="font-display mt-3 text-3xl font-light tracking-tight text-neutral-50 lg:text-4xl"
    >
      {title}
    </motion.h2>
    {description && (
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={`mt-4 max-w-2xl text-neutral-400 ${align === "center" ? "mx-auto" : ""}`}
      >
        {description}
      </motion.p>
    )}
  </div>
);

export default SectionHeading;
