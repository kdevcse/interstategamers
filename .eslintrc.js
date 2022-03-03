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
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
    "@typescript-eslint/no-explicit-any": "off",
    "quotes": ["error", "double"]
  },
  env: {
    "vue/setup-compiler-macros": true
  }
};
