import path from 'node:path';
import { createRequire } from 'node:module';
import { defineConfig, normalizePath } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite"
// import vercel from 'vite-plugin-vercel';

const require = createRequire(import.meta.url);
const standardFontsDir = normalizePath(
  path.join(path.dirname(require.resolve('pdfjs-dist/package.json')), 'standard_fonts')
);



const pdfjsDistPath = path.dirname(require.resolve('pdfjs-dist/package.json'));
const cMapsDir = normalizePath(path.join(pdfjsDistPath, 'cmaps'));


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),tailwindcss(),
    viteStaticCopy({
        targets: [
            {
               src: standardFontsDir,
               dest: '',
             },
           ],
    }),
    // vercel(),
  ],
});
