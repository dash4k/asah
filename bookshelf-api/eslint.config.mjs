import js from "@eslint/js";
import globals from "globals";
import {FlatCompat} from "@eslint/eslintrc";
import {defineConfig} from "eslint/config";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

export default defineConfig([
  js.configs.recommended,
  ...compat.extends("google"),

  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {...globals.node, ...globals.browser},
    },
    rules: {
      "max-len": [
        "error",
        {code: 100, ignoreStrings: true, ignoreComments: true},
      ],
      "require-jsdoc": "off",
      "valid-jsdoc": "off",
      "quotes": ["error", "double"],
      "semi": ["error", "always"],
    },
  },
]);
