import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: ["src/*.ts", "!src/*.test.ts", "!src/cli.ts"],
    format: ["cjs", "esm"],
    dts: true,
    clean: true,
    outDir: "dist",
  },
  {
    entry: ["cli/index.ts"],
    format: "cjs",
    clean: true,
    outDir: "bin",
    banner: {
      js: "#!/usr/bin/env node",
    },
  },
]);
