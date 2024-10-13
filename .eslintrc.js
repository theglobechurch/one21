module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:react/recommended",
    "airbnb",
    // "standard",
    "plugin:react/jsx-runtime",
  ],
  parser: "@babel/eslint-parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
    requireConfigFile: false,
    babelOptions: {
      presets: ["@babel/preset-react"],
    },
  },
  plugins: [
    "react",
    "babel",
  ],
  rules: {
    quotes: ["error", "double"],
    "react/jsx-uses-react": 1,
    "react/jsx-filename-extension": ["warn", { extensions: [".js", ".jsx"] }],
    "react/require-default-props": "off",
    // TODO - Turn this rule back on when we replace the binds
    "react/jsx-no-bind": "off",
    // "react/destructuring-assignment": ["warn", "never"],
    "jsx-a11y/label-has-associated-control": ["error", {
      required: {
        some: ["nesting", "id"],
      },
    }],
    "jsx-a11y/label-has-for": ["error", {
      required: {
        some: ["nesting", "id"],
      },
    }],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
