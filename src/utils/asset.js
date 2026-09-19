// Public-folder assets are referenced with root-relative paths (e.g. "/ansh.jpg"),
// but the site is deployed under a GitHub Pages subpath (see vite.config.js `base`).
// This resolves such a path against the actual configured base at runtime.
export const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
