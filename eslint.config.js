import eslint from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { languageOptions: { globals: globals.node } },
  eslint.configs.recommended,
  tseslint.configs.recommended,
  importPlugin.flatConfigs.recommended,
  {
    rules: {
      "import/no-unresolved": "off",
      "import/order": [
        "warn",
        {
          "newlines-between": "always",
          alphabetize: { order: "asc" },
          warnOnUnassignedImports: true,
        },
      ],
    },
  },
  {
    ignores: ["dist", "node_modules"],
  },
);
