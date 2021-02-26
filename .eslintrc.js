module.exports = {
  env: {
    browser: false,
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
    "quotes": ["error", "double"],
    "react/jsx-filename-extension": ["warn", { extensions: [".js", ".jsx"] }],
    // TODO - Turn this rule back on when we replace the binds
    "react/jsx-no-bind": "off",
    // "react/destructuring-assignment": ["warn", "never"],

    // TODO: Loop back around and enable these one by one and fix the issues!
    "camelcase": "off",
    "no-unused-vars": "off",
    "no-undef": "off",
    "react/jsx-props-no-spreading": "off",
    "react/no-array-index-key": "off",
    "react/require-default-props": "off",
    "react/forbid-prop-types": "off",
    "react/destructuring-assignment": "off",
    "react/prefer-stateless-function": "off",
    "react/button-has-type": "off",
    "react/prop-types": "off",
    "comma-dangle": "off",
    "class-methods-use-this": "off",
    "react/static-property-placement": "off",
    "no-param-reassign": "off",
    "no-use-before-define": "off",
    "react/no-access-state-in-setstate": "off",
    "jsx-a11y/label-has-associated-control": "off",
    "react/no-access-state-in-setstate": "off",
    "max-len": "off",
    "react/sort-comp": "off"
  },
};
