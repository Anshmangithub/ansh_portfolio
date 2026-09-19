# Ansh Gajbhiye — Portfolio

A multi-page portfolio built with React, React Router, Tailwind CSS, Framer Motion, and a
custom Three.js particle scene on the home page (mouse-reactive, scroll-morphing, bloom).

## Getting started

```bash
npm install
npm run dev
```

## Contact form setup (required for the form to actually send email)

The contact form uses [EmailJS](https://www.emailjs.com) so messages land in your inbox without
running a backend server.

1. Create a free account at emailjs.com.
2. Add an **Email Service** (e.g. connect your Gmail).
3. Add an **Email Template** with these variable names in it: `name`, `email`, `subject`, `message`.
4. Copy `.env.example` to `.env` and fill in your Service ID, Template ID, and Public Key:

   ```bash
   cp .env.example .env
   ```

5. Restart the dev server. Until this is configured, the form will show a friendly inline
   error instead of silently failing.

## Deploying to GitHub Pages

```bash
npm run deploy
```

This builds the site and pushes `dist/` to the `gh-pages` branch. The Vite `base` and the
`BrowserRouter` basename are both set from the `homepage` in `package.json` (`/ansh_portfolio/`),
and `public/404.html` handles the GitHub Pages SPA-refresh redirect. If you rename the repo,
update `base` in `vite.config.js` and `homepage` in `package.json` to match.

## Project structure

- `src/pages/` — routed pages (Home, About, Services, Projects, Contact)
- `src/components/` — shared UI (Navbar, Footer, ProjectCard, ContactForm, etc.)
- `src/three/` — the WebGL particle hero (shader material, geometry, Canvas wrapper)
- `src/constants/` — all editable site copy (projects, skills, services, contact info)
