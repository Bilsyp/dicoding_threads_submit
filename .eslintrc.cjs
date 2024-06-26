module.exports = {
  root: true,
  env: { browser: true, es2020: true, "cypress/globals": true },
  extends: [
    "standard",

    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:storybook/recommended",
    "plugin:storybook/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh", "cypress"],
  rules: {
    "react/jsx-no-target-blank": "off",
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    // TODO : mematikan beberapa rules karena conlict dengan prettier
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "comma-dangle": "off",
    quotes: "off",
    "arrow-body-style": "off",
    "prefer-arrow-callback ": "off",
    indent: "off",
    "space-before-function-paren": "off",
    "trailing-whitespace": 0,
    "multiline-ternary": "off",
  },
};
