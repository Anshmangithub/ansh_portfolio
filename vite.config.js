import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: "/ansh_portfolio/",
  plugins: [react()],
  server: {
    port: 3000, // Change this if needed
  },
});