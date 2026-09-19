import { Link } from "react-router-dom";
import { FaLinkedin, FaGithub, FaInstagram, FaSquareXTwitter } from "react-icons/fa6";
import { NAV_LINKS, SOCIALS, CONTACT } from "../constants";

const socialIcons = [
  { href: SOCIALS.linkedin, icon: FaLinkedin, label: "LinkedIn" },
  { href: SOCIALS.github, icon: FaGithub, label: "GitHub" },
  { href: SOCIALS.twitter, icon: FaSquareXTwitter, label: "X" },
  { href: SOCIALS.instagram, icon: FaInstagram, label: "Instagram" },
];

const Footer = () => {
  return (
    <footer className="relative z-10 mt-32 border-t border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-14 lg:flex-row lg:items-start lg:justify-between lg:px-10">
        <div className="max-w-sm">
          <p className="text-lg font-semibold tracking-tight">Ansh Gajbhiye</p>
          <p className="mt-3 text-sm leading-relaxed text-neutral-400">
            Software engineer building full-stack products with applied AI baked in.
            Open to full-time roles, freelance work, and interesting problems.
          </p>
          <a
            href={`mailto:${CONTACT.email}`}
            className="mt-4 inline-block border-b border-amber-300/60 text-sm text-amber-300 transition-colors hover:border-amber-200 hover:text-amber-200"
          >
            {CONTACT.email}
          </a>
        </div>

        <div className="flex gap-16">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">Navigate</p>
            <ul className="mt-4 flex flex-col gap-2 text-sm text-neutral-300">
              {NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="transition-colors hover:text-amber-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">Elsewhere</p>
            <ul className="mt-4 flex flex-col gap-2 text-sm text-neutral-300">
              {socialIcons.map(({ href, icon: Icon, label }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 transition-colors hover:text-amber-300"
                  >
                    <Icon /> {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 px-6 py-6 text-center text-xs text-neutral-600">
        © {new Date().getFullYear()} Ansh Gajbhiye. Built from scratch with React, Tailwind &amp; Three.js.
      </div>
    </footer>
  );
};

export default Footer;
