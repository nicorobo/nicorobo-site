import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import glsl from 'vite-plugin-glsl';

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind()],
  vite: {
    plugins: [glsl()]
  }
});