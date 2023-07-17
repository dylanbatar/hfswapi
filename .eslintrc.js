module.exports = {
  env: {
    browser: false,
    commonjs: true,
    es2021: true,
  },
  extends: 'eslint:recommended',
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    "no-undef": "off",
    "max-len": ["error", { "code": 180 }]
  },
};
