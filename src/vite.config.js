import { defineConfig } from 'vite';
// https://vitejs.dev/config/
export default defineConfig({
    base: '/4-api-typescript/', // 👈 Afegeix això: nom exacte del teu repo
    define: {
        'process.env': process.env,
    }
});
