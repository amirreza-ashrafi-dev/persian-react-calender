import esbuild from 'esbuild';
import { nodeExternalsPlugin } from 'esbuild-node-externals';

esbuild
  .build({
    entryPoints: ['src/index.ts'],
    outfile: 'dist/index.js',
    bundle: true,
    minify: true,
    treeShaking: true,
    platform: 'neutral',
    format: 'esm',
    target: 'node14',
    plugins: [nodeExternalsPlugin()],
  })
  .catch(() => process.exit(1));