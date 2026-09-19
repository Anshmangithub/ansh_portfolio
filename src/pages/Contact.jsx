import { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { FaLocationDot, FaPhone, FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa6";
import SectionHeading from "../components/SectionHeading.jsx";
import ContactForm from "../components/ContactForm.jsx";
import HudFrame from "../components/HudFrame.jsx";
import { CONTACT, SOCIALS } from "../constants";
import { asset } from "../utils/asset.js";

const OrbAccent = lazy(() => import("../three/OrbAccent.jsx"));

const socialIcons = [
  { href: SOCIALS.linkedin, icon: FaLinkedin, label: "LinkedIn" },
  { href: SOCIALS.github, icon: FaGithub, label: "GitHub" },
  { href: SOCIALS.instagram, icon: FaInstagram, label: "Instagram" },
];

const Contact = () => {
  return (
    <div className="pb-32">
      <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-start">
        <SectionHeading
          eyebrow="Contact"
          index="01"
          title="Let's build something."
          description="Open a channel below — it lands straight in my inbox, or reach me directly on any platform."
        />
        <div className="hidden h-28 w-28 shrink-0 lg:block">
          <Suspense fallback={null}>
            <OrbAccent className="h-28 w-28" />
          </Suspense>
        </div>
      </div>

      <div className="mt-14 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <img
              src={asset("/ansh.jpg")}
              alt="Ansh Gajbhiye"
              className="h-16 w-16 shrink-0 rounded-full border border-white/10 object-cover"
            />
            <div>
              <p className="font-medium text-neutral-100">Ansh Gajbhiye</p>
              <p className="text-sm text-neutral-500">Usually replies within a day or two.</p>
            </div>
          </div>

          <HudFrame label="Coordinates" className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="space-y-4 text-sm text-neutral-300">
              <div className="flex items-center gap-3">
                <FaLocationDot className="text-emerald-300" />
                {CONTACT.address}
              </div>
              <div className="flex items-center gap-3">
                <FaPhone className="text-emerald-300" />
                {CONTACT.phoneNo}
              </div>
            </div>
          </HudFrame>

          <div className="flex items-center gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-lg text-neutral-300">
            {socialIcons.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                data-cursor="OPEN"
                className="transition-colors hover:text-emerald-300"
              >
                <Icon />
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8"
        >
          <ContactForm />
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
