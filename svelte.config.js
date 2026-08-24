import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({ fallback: '404.html' }),
		// The site is served under a path prefix on the studio domain
		// (diagramchasing.fun/2024/who-is-my-neta) via a Netlify 200-rewrite proxy
		// configured in the studio site repo's _redirects. paths.base makes the
		// client router, prerendered links, and the SPA fallback all carry that prefix.
		//
		// relative:false -> ABSOLUTE asset URLs (/2024/who-is-my-neta/_app/...). Required
		// because the entry URL is visited without a trailing slash (/2024/who-is-my-neta),
		// and relative "./_app/..." would resolve against the parent (/2024/), dropping the
		// prefix. Absolute paths are trailing-slash-independent.
		paths: { base: '/2024/who-is-my-neta', relative: false }
	},
	preprocess: vitePreprocess(),
	vitePlugin: {
		inspector: true
	}
};

export default config;
