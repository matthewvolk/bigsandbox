import { defineConfig } from 'tsup';

export default defineConfig({
  entryPoints: ['src/add.ts', 'src/subtract.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  outDir: 'dist',
  clean: true,
});
