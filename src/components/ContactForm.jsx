import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa6";
import { CONTACT } from "../constants";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const isConfigured = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);

const fieldClasses =
  "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-neutral-100 outline-none transition-colors placeholder:text-neutral-500 focus:border-amber-300/60 focus:bg-white/[0.06]";

const ContactForm = () => {
  const formRef = useRef(null);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Honeypot: if this hidden field was filled, silently drop the submission.
    if (formRef.current.website?.value) {
      setStatus("success");
      formRef.current.reset();
      return;
    }

    if (!isConfigured) {
      setStatus("error");
      setErrorMessage(
        "Email delivery isn't configured yet — add your EmailJS keys to .env (see .env.example)."
      );
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, { publicKey: PUBLIC_KEY });
      setStatus("success");
      formRef.current.reset();
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong sending that — try again, or email me directly.");
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-neutral-500">
            Name
          </label>
          <input id="name" name="name" type="text" required placeholder="Your name" className={fieldClasses} />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-neutral-500">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className={fieldClasses}
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-neutral-500">
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          required
          placeholder="What's this about?"
          className={fieldClasses}
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-neutral-500">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Tell me a bit about what you're building..."
          className={`${fieldClasses} resize-none`}
        />
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={status === "sending"}
        data-cursor="SEND"
        className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-300 via-cyan-300 to-violet-300 px-6 py-3 font-mono text-sm font-semibold uppercase tracking-wide text-neutral-950 transition-opacity disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? "Transmitting..." : "Initiate Connection"}
        <FaPaperPlane className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </motion.button>

      {status === "success" && (
        <p className="font-mono text-sm text-emerald-400">
          {"> message_sent(ok=true)"}
          <br />
          {"> awaiting_reply — usually within a day or two."}
        </p>
      )}
      {status === "error" && (
        <p className="font-mono text-sm text-rose-400">
          {"> message_sent(ok=false)"}
          <br />
          {errorMessage}
        </p>
      )}
      <p className="text-xs text-neutral-600">
        Prefer email directly?{" "}
        <a href={`mailto:${CONTACT.email}`} className="underline decoration-neutral-700 hover:text-neutral-400">
          {CONTACT.email}
        </a>
      </p>
    </form>
  );
};

export default ContactForm;
