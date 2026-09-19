import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SectionHeading from "../components/SectionHeading.jsx";
import TiltCard from "../components/TiltCard.jsx";
import { SERVICES, PROCESS_STEPS } from "../constants";

const Services = () => {
  return (
    <div className="pb-32">
      <SectionHeading
        eyebrow="Services"
        index="01"
        title="What I can build for you."
        description="I take on freelance and collaborative work across full-stack and applied AI — here's roughly how I split it."
      />

      <div className="mt-14 grid gap-6 sm:grid-cols-2">
        {SERVICES.map((service, index) => (
          <TiltCard key={service.title} delay={index * 0.06} glow="rgba(103,232,249,0.12)" className="p-7">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-300/80">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-3 text-xl font-medium text-neutral-100">{service.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-neutral-400">{service.description}</p>
            <ul className="mt-5 flex flex-col gap-2">
              {service.points.map((point) => (
                <li key={point} className="flex items-start gap-2 text-sm text-neutral-300">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-amber-300" />
                  {point}
                </li>
              ))}
            </ul>
          </TiltCard>
        ))}
      </div>

      <div className="mt-28">
        <SectionHeading eyebrow="Process" index="02" title="How a project usually goes." />
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="relative"
            >
              <span className="font-mono text-4xl font-thin text-neutral-700">{step.step}</span>
              <h3 className="mt-3 text-base font-semibold text-neutral-100">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-400">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-28 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent p-10 text-center">
        <h3 className="text-2xl font-light text-neutral-50">Have something in mind?</h3>
        <p className="mx-auto mt-3 max-w-md text-sm text-neutral-400">
          Tell me about it — even a rough idea is a good place to start.
        </p>
        <Link
          to="/contact"
          className="mt-6 inline-block rounded-full bg-gradient-to-r from-amber-300 via-orange-300 to-cyan-300 px-7 py-3 text-sm font-semibold text-neutral-950 transition-transform hover:scale-105"
        >
          Start a conversation
        </Link>
      </div>
    </div>
  );
};

export default Services;
