import adapter from '@sveltejs/adapter-static' // change l' adaptateur depuis adapter-auto
import { sveltePreprocess } from 'svelte-preprocess'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consulter https://github.com/sveltejs/svelte-preprocess
  // pour plus d'informations sur le préprocesseur
  preprocess: sveltePreprocess(),

  kit: {
    adapter: adapter(),
  },
};

export default config;