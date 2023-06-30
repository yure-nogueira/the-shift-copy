import { defineConfig, splitVendorChunkPlugin } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  plugins: [splitVendorChunkPlugin()],
  base: '/templarios-shift',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        research: resolve(__dirname, 'src/pages/research/research.html'),
        about: resolve(__dirname, 'src/pages/about/about.html'),
        projects: resolve(__dirname, 'src/pages/projects/projects.html')
      },
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`
      }
    }
  }
});

// import { defineConfig, splitVendorChunkPlugin } from "vite";
// import { resolve } from "path";

// export default defineConfig({
//   plugins: [splitVendorChunkPlugin()],
//   optimizeDeps: {
//     exclude: ["@ionic/core/loader"],
//     disabled: true,
//   },
//   build: {
//     rollupOptions: {
//       input: {
//         main: resolve(__dirname, "index.html"),
//         componentes: resolve(__dirname, "src/componentes.html"),
//         guias: resolve(__dirname, "src/guias.html"),
//         marcas: resolve(__dirname, "src/marcas.html"),
//         padroes: resolve(__dirname, "src/padroes.html"),
//         recursos: resolve(__dirname, "src/recursos.html"),
//       },
//       output: {
//         entryFileNames: `assets/[name].js`,
//         chunkFileNames: `assets/[name].js`,
//         assetFileNames: `assets/[name].[ext]`,
//       },
//     },
//   },
// });
