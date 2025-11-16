import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: globals.node,
    },
  },
  {
    files: ["migrations/**/*.js"],
    languageOptions: {
      sourceType: "module",
      globals: globals.node,
    },
  },
]);
