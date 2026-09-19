import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import TiltCard from "./TiltCard.jsx";
import { asset } from "../utils/asset.js";

const ProjectCard = ({ project, index }) => {
  return (
    <TiltCard
      as="a"
      href={project.href}
      target="_blank"
      rel="noreferrer"
      data-cursor="VIEW"
      delay={index * 0.06}
      className="block p-5"
    >
      {project.featured && (
        <span className="absolute right-4 top-4 z-10 flex items-center gap-1.5 rounded-full border border-amber-300/40 bg-neutral-950/80 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-amber-300 backdrop-blur">
          <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-amber-300" />
          Latest
        </span>
      )}
      <div className="relative overflow-hidden rounded-xl border border-white/5">
        <img
          src={asset(project.image)}
          alt={project.title}
          className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="relative mt-5 flex items-start justify-between gap-3">
        <h3 className="text-lg font-medium text-neutral-100">{project.title}</h3>
        <FaArrowUpRightFromSquare className="mt-1 shrink-0 text-neutral-500 transition-colors group-hover:text-amber-300" />
      </div>
      <p className="relative mt-2 text-sm leading-relaxed text-neutral-400">{project.description}</p>
      <div className="relative mt-4 flex flex-wrap gap-2">
        {project.technologies.map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-neutral-300"
          >
            {tech}
          </span>
        ))}
      </div>
    </TiltCard>
  );
};

export default ProjectCard;
