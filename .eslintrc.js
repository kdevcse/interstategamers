module.exports = {
  parser: "vue-eslint-parser",
  files: [".ts", ".vue"],
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
    "quotes": ["error", "double"]
  },
  env: {
    "vue/setup-compiler-macros": true
  }
};
