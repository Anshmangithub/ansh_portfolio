import { motion } from "framer-motion";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { useTilt } from "../hooks/useTilt.js";
import { asset } from "../utils/asset.js";

// The editorial, full-bleed treatment used on the dedicated Projects page —
// alternates sides, leans on oversized type instead of a uniform card grid.
const ProjectShowcase = ({ project, index }) => {
  const { ref, onMouseMove, onMouseLeave } = useTilt(6);
  const reversed = index % 2 === 1;

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7 }}
      className="relative border-t border-white/10 py-16 first:border-t-0 first:pt-0"
    >
      <div className={`flex flex-col gap-10 lg:flex-row lg:items-center ${reversed ? "lg:flex-row-reverse" : ""}`}>
        <div className="lg:w-3/5" style={{ perspective: "1200px" }}>
          <a
            href={project.href}
            target="_blank"
            rel="noreferrer"
            data-cursor="VIEW PROJECT"
            ref={ref}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            className="group relative block overflow-hidden rounded-xl border border-white/10 will-change-transform"
            style={{
              transform: "rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))",
              transformStyle: "preserve-3d",
            }}
          >
            {project.featured && (
              <span className="absolute right-4 top-4 z-10 flex items-center gap-1.5 rounded-full border border-amber-300/40 bg-[#050506]/80 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-amber-300 backdrop-blur">
                <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-amber-300" />
                Latest
              </span>
            )}
            <img
              src={asset(project.image)}
              alt={project.title}
              className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-80"
              loading="lazy"
            />
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(400px circle at var(--mx, 50%) var(--my, 50%), rgba(52,226,176,0.15), transparent 60%)",
              }}
            />
          </a>
        </div>

        <div className="lg:w-2/5">
          <span className="font-display text-6xl font-light text-white/10 lg:text-7xl">
            {String(index + 1).padStart(2, "0")}
          </span>

          <h3 className="font-display -mt-3 text-3xl font-medium text-neutral-50 lg:text-4xl">
            {project.title}
          </h3>

          <p className="mt-4 text-sm leading-relaxed text-neutral-400">{project.description}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-neutral-300"
              >
                {tech}
              </span>
            ))}
          </div>

          <a
            href={project.href}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-sm text-emerald-300 transition-colors hover:text-emerald-200"
          >
            View live
            <FaArrowUpRightFromSquare className="text-xs" />
          </a>
        </div>
      </div>
    </motion.article>
  );
};

export default ProjectShowcase;
