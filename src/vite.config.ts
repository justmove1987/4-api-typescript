import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': process.env, // Por compatibilidad si alguna librería lo necesita
  }
});
