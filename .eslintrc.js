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
    "@typescript-eslint/space-before-blocks": ["error", "always"],
    "@typescript-eslint/type-annotation-spacing": ["error", { "after": true }],
    "space-before-function-paren": "off",
    "@typescript-eslint/space-before-function-paren": ["error", "never"],
    "default-param-last": "off",
    "@typescript-eslint/default-param-last": ["error"],
    "camelcase": "off",
    "@typescript-eslint/naming-convention": [
      "warn",
      {
        "selector": "default",
        "format": ["camelCase"]
      },
      {
        "selector": "variable",
        "modifiers": ["global", "const", "exported"],
        "format": ["UPPER_CASE"]
      },
      {
        "selector": "variableLike",
        "format": ["camelCase", "PascalCase"]
      },
      {
        "selector": "interface",
        "format": ["PascalCase"],
        "prefix": ["I"]
      },
      {
        "selector": "typeLike",
        "format": ["PascalCase"]
      },
      {
        "selector": "enum",
        "format": ["PascalCase"]
      },
      {
        "selector": "enumMember",
        "format": ["UPPER_CASE"]
      },
      {
        "selector": "objectLiteralProperty",
        "format": ["PascalCase", "camelCase"]
      }
    ]
  },
  env: {
    "vue/setup-compiler-macros": true
  }
};
