import { motion } from "framer-motion";
import SectionHeading from "../components/SectionHeading.jsx";
import TiltCard from "../components/TiltCard.jsx";
import SkillConstellation from "../components/SkillConstellation.jsx";
import { ABOUT_TEXT, ABOUT_STATS, SKILL_GROUPS } from "../constants";

const About = () => {
  return (
    <div className="pb-32">
      <SectionHeading eyebrow="About" index="01" title="The person behind the particles." />

      <div className="mt-14 grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-base leading-relaxed text-neutral-300 lg:text-lg"
        >
          {ABOUT_TEXT}
        </motion.p>

        <div className="grid grid-cols-2 gap-4">
          {ABOUT_STATS.map((stat, index) => (
            <TiltCard key={stat.label} delay={index * 0.06} className="p-5">
              <p className="text-2xl font-light text-neutral-50">{stat.value}</p>
              <p className="mt-1 text-xs uppercase tracking-wide text-neutral-500">{stat.label}</p>
            </TiltCard>
          ))}
        </div>
      </div>

      <div className="mt-24">
        <SectionHeading
          eyebrow="Toolbox"
          index="02"
          title="What I actually work with."
          description="Hover a cluster to trace what it connects to. The full list is spelled out below either way."
        />

        <div className="mt-12">
          <SkillConstellation />
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SKILL_GROUPS.map((group, index) => (
            <TiltCard key={group.title} delay={index * 0.05} glow="rgba(103,232,249,0.12)" className="p-5">
              <h3 className="font-mono text-sm font-semibold uppercase tracking-wide text-amber-300/90">
                {group.title}
              </h3>
              <ul className="mt-4 flex flex-col gap-2 text-sm text-neutral-300">
                {group.skills.map((skill) => (
                  <li key={skill} className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-cyan-300" />
                    {skill}
                  </li>
                ))}
              </ul>
            </TiltCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
