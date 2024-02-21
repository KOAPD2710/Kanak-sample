import { defineConfig } from 'astro/config';
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  // base: '/dist',
  // trailingSlash: 'never',
  // build: {        
  //     format: 'file'
  // },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport'
  },
  integrations: [
    react({
      experimentalReactChildren: true,
    }),
  ],
  
});