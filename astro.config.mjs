// @ts-check
import { defineConfig } from 'astro/config';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
    site: 'https://DarekRepos.github.io/forty-astro-theme/',
    base: '/forty-astro-theme/',
    integrations: [
        icon(),
    ],
});
