import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const isVercel = Boolean(process.env.VERCEL);

export default defineConfig({
  base: isVercel ? "/" : "/ansh_portfolio/",
  plugins: [react()],
  server: {
    port: 3000, // Change this if needed
  },
});