import { defineConfig, splitVendorChunkPlugin } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  plugins: [splitVendorChunkPlugin()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        research: resolve(__dirname, 'src/pages/research/research.html'),
        about: resolve(__dirname, 'src/pages/about/about.html'),
        projects: resolve(__dirname, 'src/pages/projects/projects.html')
      }
      // output: {
      //   entryFileNames: `assets/[name].js`,
      //   chunkFileNames: `assets/[name].js`,
      //   assetFileNames: `assets/[name].[ext]`
      // }
    }
  }
});
