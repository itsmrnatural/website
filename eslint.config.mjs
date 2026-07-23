import nextVitals from "eslint-config-next/core-web-vitals";
import tsParser from "@typescript-eslint/parser";

const eslintConfig = [
  ...nextVitals,
  {
    ignores: [".next/**", "out/**", "build/**", "next-env.d.ts"],
  },
  {
    files: ["**/*.js", "**/*.jsx", "**/*.mjs"],
    languageOptions: {
      parser: tsParser,
    },
  },
  {
    files: ["src/components/LanyardStatus.js", "pages/blog/\\[id\\].jsx"],
    rules: {
      "@next/next/no-img-element": "off",
    },
  },
  {
    rules: {
      "react/no-unescaped-entities": "off",
      "@next/next/no-html-link-for-pages": "off",
      "react/jsx-no-target-blank": "off",
      "jsx-a11y/anchor-is-valid": "off",
      "react-hooks/set-state-in-effect": "error",
    },
  },
];

export default eslintConfig;
