import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaLinkedin, FaGithub, FaInstagram, FaBars, FaXmark } from "react-icons/fa6";
import { NAV_LINKS, SOCIALS } from "../constants";

const socialIcons = [
  { href: SOCIALS.linkedin, icon: FaLinkedin, label: "LinkedIn" },
  { href: SOCIALS.github, icon: FaGithub, label: "GitHub" },
  { href: SOCIALS.instagram, icon: FaInstagram, label: "Instagram" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 lg:px-10">
        <NavLink to="/" className="flex items-center gap-2 text-lg font-semibold tracking-tight">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-sm font-bold text-amber-300 backdrop-blur">
            AG
          </span>
          <span className="hidden sm:inline">Ansh Gajbhiye</span>
        </NavLink>

        <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-2 backdrop-blur md:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/"}
              className={({ isActive }) =>
                `relative rounded-full px-4 py-1.5 text-sm transition-colors ${
                  isActive ? "text-neutral-950" : "text-neutral-300 hover:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-amber-300 via-orange-300 to-cyan-300"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  {link.label}
                </>
              )}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-4 text-lg text-neutral-300 md:flex">
          {socialIcons.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="transition-colors hover:text-amber-300"
            >
              <Icon />
            </a>
          ))}
          <span className="ml-1 hidden items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-emerald-300/80 xl:flex">
            <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-emerald-300" />
            Available
          </span>
        </div>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-lg md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <FaXmark /> : <FaBars />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="mx-4 mb-4 rounded-2xl border border-white/10 bg-neutral-950/95 p-4 backdrop-blur md:hidden"
          >
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === "/"}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `rounded-xl px-4 py-3 text-sm ${
                      isActive ? "bg-white/10 text-white" : "text-neutral-300"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-5 border-t border-white/10 px-4 pt-3 text-lg text-neutral-300">
              {socialIcons.map(({ href, icon: Icon, label }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}>
                  <Icon />
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
