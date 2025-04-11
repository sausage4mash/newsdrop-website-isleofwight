import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// Use environment variable for deployment type or default to development
const isGitHubPages = process.env.DEPLOY_TARGET === 'github-pages';

export default defineConfig({
  // Use the base path only for GitHub Pages deployment
  base: isGitHubPages ? "/newsdrop-website-isleofwight/" : "/",
  plugins: [react()],
});