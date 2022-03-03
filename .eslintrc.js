module.exports = {
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser"
  },
  plugins: [
    "@typescript-eslint"
  ],
  extends: [
    "plugin:vue/vue3-recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
    "quotes": ["error", "double"],
    "semi": "off",
    "@typescript-eslint/semi": ["error", "always"],
    "space-before-blocks": "off",
    "@typescript-eslint/space-before-blocks": ["error", "always"]
  },
  env: {
    "vue/setup-compiler-macros": true
  }
};
