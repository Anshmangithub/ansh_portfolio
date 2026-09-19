import { Suspense, lazy, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading.jsx";
import TiltCard from "./TiltCard.jsx";
import HudFrame from "./HudFrame.jsx";
import { gsap } from "../lib/gsap.js";
import { EXPERIENCES, EDUCATION, CERTIFICATIONS } from "../constants";

const OrbAccent = lazy(() => import("../three/OrbAccent.jsx"));

const ExperienceSection = () => {
  const timelineRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    if (!timelineRef.current || !progressRef.current) return undefined;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        progressRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 75%",
            end: "bottom 65%",
            scrub: 0.6,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative border-t border-white/5 py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px overflow-hidden">
        <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent animate-scanline" />
      </div>

      <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-start">
        <SectionHeading eyebrow="Where I've worked" index="01" title="Two years, shipping real AI products." />
        <div className="hidden h-40 w-40 shrink-0 lg:block">
          <Suspense fallback={null}>
            <OrbAccent className="h-40 w-40" />
          </Suspense>
        </div>
      </div>

      <div ref={timelineRef} className="relative mt-16 space-y-6">
        <div className="absolute bottom-0 left-[7px] top-2 hidden w-px bg-white/10 sm:block" />
        <div
          ref={progressRef}
          style={{ transformOrigin: "top" }}
          className="absolute bottom-0 left-[7px] top-2 hidden w-px bg-gradient-to-b from-emerald-300 via-cyan-300 to-transparent shadow-[0_0_8px_rgba(52,226,176,0.6)] sm:block"
        />

        {EXPERIENCES.map((exp, index) => (
          <div key={exp.company} className="relative sm:pl-10">
            <span className="absolute left-0 top-2 hidden h-4 w-4 items-center justify-center sm:flex">
              <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.8)]" />
            </span>

            <TiltCard delay={index * 0.08} glow="rgba(103,232,249,0.12)" className="p-6 sm:p-7">
              <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-baseline">
                <div>
                  <h3 className="text-lg font-medium text-neutral-100">{exp.role}</h3>
                  <p className="text-sm text-cyan-300/80">
                    {exp.company} · {exp.location}
                  </p>
                </div>
                <p className="font-mono text-xs uppercase tracking-widest text-neutral-500">{exp.period}</p>
              </div>

              <ul className="relative mt-4 flex flex-col gap-2">
                {exp.points.map((point) => (
                  <li key={point} className="flex items-start gap-2 text-sm text-neutral-400">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-amber-300" />
                    {point}
                  </li>
                ))}
              </ul>

              <div className="relative mt-5 flex flex-wrap gap-2">
                {exp.tech.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-neutral-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </TiltCard>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55 }}
        >
          <HudFrame label="Education" className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h3 className="text-base font-medium text-neutral-100">{EDUCATION.degree}</h3>
            <p className="mt-1 text-sm text-neutral-400">{EDUCATION.school}</p>
            <p className="mt-3 font-mono text-xs uppercase tracking-widest text-neutral-500">
              {EDUCATION.period} · {EDUCATION.location}
            </p>
          </HudFrame>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, delay: 0.08 }}
        >
          <HudFrame
            label="Certifications"
            className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6"
          >
            <ul className="flex flex-col gap-2">
              {CERTIFICATIONS.map((cert) => (
                <li key={cert} className="flex items-start gap-2 text-sm text-neutral-400">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cyan-300" />
                  {cert}
                </li>
              ))}
            </ul>
          </HudFrame>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
