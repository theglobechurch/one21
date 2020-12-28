module.exports = {
  env: {
    browser: true,
  },
  extends: [
    "plugin:react/recommended",
    "airbnb",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: [
    "react",
    "babel",
  ],
  parser: "babel-eslint",
  rules: {
    quotes: ["error", "double"],
    "react/jsx-filename-extension": ["warn", { extensions: [".js", ".jsx"] }],
    // "react/destructuring-assignment": ["warn", "never"],
  },
};
