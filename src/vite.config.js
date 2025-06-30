import { defineConfig } from 'vite';
// https://vitejs.dev/config/
export default defineConfig({
    base: '/4-api-typescript/', // 👈 Aquest és el canvi important!
    define: {
        'process.env': process.env,
    }
});
