import SectionHeading from "../components/SectionHeading.jsx";
import ProjectShowcase from "../components/ProjectShowcase.jsx";
import { PROJECTS } from "../constants";

const Projects = () => {
  return (
    <div className="pb-32">
      <SectionHeading
        eyebrow="Projects"
        index="01"
        title="Things I've built end to end."
        description="From an AI-powered fraud detector shipping in production to full-stack MERN apps — auth, data models, and UI all written by me, deployed and live."
      />

      <div className="mt-16">
        {PROJECTS.map((project, index) => (
          <ProjectShowcase key={project.title} project={project} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
