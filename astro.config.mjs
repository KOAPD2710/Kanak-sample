import { defineConfig } from 'astro/config';

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
    }
});
