export const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Projects", path: "/projects" },
  { label: "Contact", path: "/contact" },
];

export const HERO_CONTENT = `I'm a software engineer working at the intersection of full-stack engineering and applied AI — architecting LLM routing systems, RAG pipelines, and agentic workflows, then shipping them behind interfaces built with React, Next.js and WebGL. Two years in, still building things that don't look like everyone else's template.`;

export const ABOUT_TEXT = `I'm Ansh Gajbhiye, a software engineer based in New Delhi with two years of experience shipping full-stack and AI-integrated products. At IronLabs AI I architected an intelligent LLM routing system that selects models in real time across multiple providers and inference engines, and built generative AI features — video synthesis, image pipelines, 3D web visualization — orchestrated through LLMs, cutting latency 40% and cost 30% along the way. Before that, at Montcrest Software, I built a real-time flight management system and a reusable Material-UI component library in strict TypeScript. Outside of work I ship my own products end to end — TrustBot AI, an explainable scam-detection platform combining LLM classification, rule-based checks and RAG similarity search, is the one I'm currently building on. I care about the same thing on both sides of the stack: systems that are fast, explainable, and don't hide their edge cases — whether that's an API response or a rendered frame.`;

export const ABOUT_STATS = [
  { label: "Experience", value: "2+ yrs" },
  { label: "Core stack", value: "TS / React / Next" },
  { label: "Focus", value: "Full-stack + AI/LLM" },
  { label: "Status", value: "Open to work" },
];

export const SKILL_GROUPS = [
  {
    title: "Languages",
    skills: ["TypeScript", "JavaScript", "Python", "Java", "C#"],
  },
  {
    title: "AI / LLM Engineering",
    skills: [
      "LLM Routing & Orchestration",
      "RAG (pgvector)",
      "Prompt Engineering",
      "Agentic AI & Tool Calling",
      "MCP (Model Context Protocol)",
      "Vector Databases",
    ],
  },
  {
    title: "Frontend",
    skills: ["React.js", "Next.js", "Vite", "Tailwind CSS", "Redux / Zustand", "Three.js", "Framer Motion"],
  },
  {
    title: "Backend & APIs",
    skills: ["Node.js", "Express.js", "ASP.NET", "Prisma ORM", "REST & GraphQL", "Jest / Playwright"],
  },
  {
    title: "Databases & Storage",
    skills: ["PostgreSQL", "Supabase", "pgvector", "MongoDB", "SQL"],
  },
  {
    title: "DevOps & Cloud",
    skills: ["Git & GitHub", "CI/CD Pipelines", "Docker", "AWS", "Cloudflare R2"],
  },
];

export const EXPERIENCES = [
  {
    role: "Software Engineer",
    company: "IronLabs AI",
    location: "Delhi, India",
    period: "Jul 2025 — Aug 2026",
    points: [
      "Architected and deployed an intelligent LLM routing system with real-time model selection across multiple LLM providers and inference engines.",
      "Built generative AI capabilities — video synthesis, image generation pipelines, and 3D web visualization — orchestrated through LLMs.",
      "Cut latency 40% and cost 30% using TypeScript, Next.js, React.js, Prisma ORM, and algorithmic request batching.",
    ],
    tech: ["TypeScript", "Next.js", "React.js", "Prisma ORM", "LLM Routing"],
  },
  {
    role: "Software Engineer Trainee",
    company: "Montcrest Software Pvt. Ltd.",
    location: "Pune, India",
    period: "Apr 2025 — Jul 2025",
    points: [
      "Built a real-time flight management system covering booking, scheduling, and passenger management on an ASP.NET backend with a React frontend.",
      "Cut Time to Interactive by 30% by optimizing component rendering and implementing virtual scrolling.",
      "Engineered a reusable Material-UI component library in strict TypeScript for type safety and maintainability.",
    ],
    tech: ["React", "ASP.NET", "TypeScript", "Material-UI"],
  },
];

export const EDUCATION = {
  school: "Technocrats Institute of Technology, Bhopal (RGPV)",
  degree: "B.Tech in Computer Science & Engineering",
  period: "Jul 2020 — Jun 2024",
  location: "Bhopal, India",
};

export const CERTIFICATIONS = [
  "Full Stack Web Development Certification — Sheryians Coding School",
  "Postman API Fundamentals — Student Expert",
  "IronLabs AI Hackathon Participant — built an AI agent-powered marketing website generator",
  "200+ DSA problems solved on LeetCode",
];

export const SERVICES = [
  {
    title: "AI & LLM Integration",
    description:
      "Wiring LLMs into real products — provider routing, RAG pipelines over your own data, and agentic workflows that actually complete tasks instead of just chatting.",
    points: ["LLM routing & orchestration", "RAG / vector search (pgvector)", "Agentic workflows & tool calling"],
  },
  {
    title: "Full-Stack Web Apps",
    description:
      "End-to-end applications — from schema design and REST/GraphQL APIs to a React or Next.js front end that doesn't feel like an afterthought.",
    points: ["Authentication & sessions", "CRUD-heavy dashboards", "REST & GraphQL API design"],
  },
  {
    title: "Interactive Frontends",
    description:
      "Interfaces built with motion and depth in mind, not just static layout — using Framer Motion and WebGL where it earns its place.",
    points: ["Framer Motion micro-interactions", "Three.js / WebGL scenes", "Responsive, accessible UI"],
  },
  {
    title: "Landing Pages & Portfolios",
    description:
      "Fast, distinctive marketing and personal sites that avoid the generic template look — this site is the proof of concept.",
    points: ["Custom design systems", "Performance-conscious builds", "SEO-friendly structure"],
  },
  {
    title: "API & Systems Integration",
    description:
      "Connecting your product to third-party services — payments, email, auth providers, or internal tools — cleanly and securely.",
    points: ["Third-party API wiring", "Webhooks & background jobs", "Error handling that doesn't hide problems"],
  },
];

export const PROCESS_STEPS = [
  {
    step: "01",
    title: "Understand",
    description: "Figure out what the product actually needs to do, for whom, and what \"done\" looks like.",
  },
  {
    step: "02",
    title: "Design & Plan",
    description: "Sketch the data model and the UI structure before writing implementation code.",
  },
  {
    step: "03",
    title: "Build",
    description: "Ship in small, working increments — backend and frontend growing together, not in isolation.",
  },
  {
    step: "04",
    title: "Polish & Ship",
    description: "Tighten performance, motion, and edge cases, then deploy.",
  },
];

export const PROJECTS = [
  {
    title: "TrustBot AI",
    image: "/trustbot-ai.png",
    href: "https://trustbotai.vercel.app/dashboard",
    description:
      "An AI-powered scam and fraud detection platform combining LLM classification, a rule engine, and RAG similarity search into one explainable risk score — with response caching to cut redundant LLM calls. Ships an LLM-powered assistant reachable over WhatsApp, Instagram, Facebook, Telegram, SMS and the web.",
    technologies: ["Next.js", "TypeScript", "LLM", "Clerk", "Supabase", "pgvector"],
    featured: true,
  },
  {
    title: "TalentForge Web Application",
    image: "/project-1.png",
    href: "https://www.loom.com/share/8fed57991a9e4abda6ef4cd26e6e526f?sid=a91b9ab0-9bce-42b2-8c34-f231be25ad27",
    description:
      "A MERN stack platform connecting students with jobs and internships, where employers can create job postings. Features include authentication, session management, and CRUD operations.",
    technologies: ["Next.js", "Redux", "Node.js", "MongoDB", "Bootstrap"],
  },
  {
    title: "BlogApp Web Application",
    image: "/project-2.png",
    href: "https://blog-app-react-roan.vercel.app/",
    description:
      "A web application that allows users to create, read, update, and delete blog posts. It features image uploads and user authentication for a seamless experience.",
    technologies: ["React.js", "Redux", "Tailwind", "Appwrite"],
  },
  {
    title: "Hackathon Organizer",
    image: "/project-3.png",
    href: "https://ai-planet-assignment-ashy.vercel.app/",
    description:
      "A dynamic web application that allows users to create, manage, and participate in hackathons. Featuring real-time tracking, search functionality, and filter-based sorting.",
    technologies: ["React.js", "Tailwind CSS", "Redux"],
  },
  {
    title: "NPM Clone",
    image: "/project-4.png",
    href: "https://npm-clone-beta.vercel.app/",
    description:
      "A web application that replicates key functionalities of NPM, allowing users to view package details like version history, keywords, and installation commands.",
    technologies: ["React.js", "API Integration", "Tailwind CSS"],
  },
  {
    title: "ShopFusion",
    image: "/project-5.png",
    href: "https://shopfusion-qed42-web-assis.vercel.app/",
    description:
      "An e-commerce web application where users can explore products, filter by categories, search items, and adjust the price range, with cart support.",
    technologies: ["React.js", "Tailwind CSS", "Redux"],
  },
];

export const CONTACT = {
  address: "New Delhi, India",
  phoneNo: "+91-7067850049",
  email: "anshman5566@gmail.com",
};

export const SOCIALS = {
  linkedin: "https://www.linkedin.com/in/ansh-gajbhiye-a2a622185",
  github: "https://github.com/Anshmangithub",
  twitter: "https://x.com/GajbhiyeAn52363",
  instagram: "https://www.instagram.com/anshhh.__g27_/",
};
