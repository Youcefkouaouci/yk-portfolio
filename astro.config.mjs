// @ts-check
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://www.youcefkouaouci.com',
  integrations: [vue()],
  vite: { plugins: [tailwindcss()] },
});
