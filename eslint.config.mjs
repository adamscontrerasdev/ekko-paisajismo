import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import eslintPluginUnusedImports from "eslint-plugin-unused-imports";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  ...compat.extends("next/core-web-vitals", "next/typescript", "prettier"),
  {
    plugins: {
      "unused-imports": eslintPluginUnusedImports,
    },
    rules: {
      "unused-imports/no-unused-imports": "warn",

      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],

      "unused-imports/no-unused-vars": [
        "warn",
        { vars: "all", varsIgnorePattern: "^_", args: "after-used", ignoreRestSiblings: true },
      ],
    },
  },
];
