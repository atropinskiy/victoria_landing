import queryPlugin from "@tanstack/eslint-plugin-query"
import nextVitals from "eslint-config-next/core-web-vitals"
import nextTs from "eslint-config-next/typescript"
import prettier from "eslint-config-prettier/flat"
import { defineConfig, globalIgnores } from "eslint/config"

export default defineConfig([
  ...nextVitals,
  ...nextTs,

  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      ...queryPlugin.configs["flat/recommended"].rules,
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/consistent-type-imports": ["error", { prefer: "type-imports" }],
      "@typescript-eslint/no-non-null-assertion": "warn",
      "@typescript-eslint/no-require-imports": "error",
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-debugger": "error",
      "prefer-const": "error",
      "no-var": "error",
      "prefer-template": "error",
    },
  },

  prettier,

  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
])
