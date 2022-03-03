module.exports = {
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  extends: [
    "plugin:vue/vue3-recommended",
  ],
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
  },
  env: {
    'vue/setup-compiler-macros': true
  }
};
