import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight, FaArrowDown } from "react-icons/fa6";
import SectionHeading from "../components/SectionHeading.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import TiltCard from "../components/TiltCard.jsx";
import TypedLine from "../components/TypedLine.jsx";
import MagneticButton from "../components/MagneticButton.jsx";
import ExperienceSection from "../components/ExperienceSection.jsx";
import { ScrollTrigger } from "../lib/gsap.js";
import { HERO_CONTENT, SERVICES, PROJECTS } from "../constants";

// Three.js + postprocessing is a heavy dependency (~1MB) — split it into its
// own chunk so /about, /projects, etc. never have to download it.
const Hero3D = lazy(() => import("../three/Hero3D.jsx"));

const TERMINAL_LINES = [
  "routing_llm_request(provider='auto')",
  "rendering_scene(particles=9000)",
  "querying_rag(index='pgvector')",
  "deploying_to_production()",
];

const HUD_LABELS = [
  { text: "AI CORE", className: "left-[8%] top-[22%]", delay: 0.6 },
  { text: "NEURAL SYSTEM", className: "right-[10%] top-[35%]", delay: 0.9 },
  { text: "● ONLINE", className: "right-[14%] bottom-[28%]", delay: 1.2 },
];

const Home = () => {
  const heroRef = useRef(null);
  const [morph, setMorph] = useState(0);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: heroRef.current,
      start: "top top",
      end: "bottom top",
      scrub: 0.4,
      onUpdate: (self) => setMorph(self.progress),
    });

    return () => trigger.kill();
  }, []);

  return (
    <div className="relative">
      <div className="bg-hud-grid pointer-events-none fixed inset-0 -z-10 h-full w-full" aria-hidden="true" />

      <section
        ref={heroRef}
        className="relative flex h-[100svh] min-h-[680px] w-full items-center overflow-hidden pt-28 pb-12 lg:pt-32"
      >
        <Suspense fallback={<div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(52,226,176,0.18),transparent_60%)]" />}>
          <Hero3D morphTarget={morph} className="absolute inset-0 h-full w-full" />
        </Suspense>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050506]" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#050506] via-[#050506]/55 to-transparent lg:via-[#050506]/25" />

        {HUD_LABELS.map((label) => (
          <motion.span
            key={label.text}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0.6] }}
            transition={{ duration: 2, delay: label.delay, times: [0, 0.3, 0.8, 1] }}
            className={`pointer-events-none absolute z-10 hidden font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-300/50 lg:block ${label.className}`}
          >
            {label.text}
          </motion.span>
        ))}

        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 lg:px-10">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase tracking-[0.4em] text-amber-300/80"
          >
            Software Engineer · Full-Stack &amp; AI/LLM Systems
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-3 text-sm text-cyan-300/80"
          >
            <TypedLine lines={TERMINAL_LINES} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display mt-4 max-w-4xl text-4xl font-light leading-[1.05] tracking-tight text-neutral-50 sm:text-5xl lg:text-7xl"
          >
            I build products where{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-cyan-300 to-violet-300">
              engineering meets applied AI
            </span>
            .
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-neutral-400 lg:text-lg"
          >
            {HERO_CONTENT}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <MagneticButton as={Link} to="/projects" className="group flex items-center gap-2 rounded-full bg-neutral-50 px-6 py-3 text-sm font-semibold text-neutral-950">
              View my work
              <FaArrowRight className="transition-transform group-hover:translate-x-1" />
            </MagneticButton>
            <MagneticButton
              as={Link}
              to="/contact"
              className="rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-neutral-200 transition-colors hover:border-emerald-300/60 hover:text-emerald-200"
            >
              Get in touch
            </MagneticButton>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-neutral-500"
        >
          <FaArrowDown />
        </motion.div>
      </section>

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-10">
        <ExperienceSection />

        <section className="relative border-t border-white/5 py-28">
          <SectionHeading
            eyebrow="What I do"
            index="02"
            title="Full-stack builds, backed by applied AI."
            description="From LLM routing and RAG pipelines to the last pixel of motion — I work across the whole stack so the pieces fit instead of being stitched together."
          />

          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {SERVICES.map((service, index) => (
              <TiltCard key={service.title} delay={index * 0.05} glow="rgba(52,226,176,0.12)" className="p-6">
                <h3 className="text-lg font-medium text-neutral-100">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-400">{service.description}</p>
              </TiltCard>
            ))}
          </div>

          <div className="mt-8 text-right">
            <Link to="/services" className="text-sm text-emerald-300 hover:text-emerald-200">
              See all services →
            </Link>
          </div>
        </section>

        <section className="relative border-t border-white/5 py-28 pb-32">
          <SectionHeading
            eyebrow="Selected work"
            index="03"
            title="A few things I've shipped."
            description="Hover a card — it tilts toward your cursor. Everything below links out to a live build or a walkthrough."
          />

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.slice(0, 3).map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </div>

          <div className="mt-10 text-right">
            <Link to="/projects" className="text-sm text-emerald-300 hover:text-emerald-200">
              View all projects →
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
