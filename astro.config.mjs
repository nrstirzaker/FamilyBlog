// @ts-check
import {defineConfig} from 'astro/config';
import tailwindcss from "@tailwindcss/vite";



// https://astro.build/config
export default defineConfig({
    adapter: node({
        mode: 'standalone'
    }),
    vite: {plugins: [tailwindcss()],},
});