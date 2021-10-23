module.exports = {
  extends: ['eslint:recommended'],
  globals: {},
  rules: {
    indent: [2, 2, { SwitchCase: 1 }],
    'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
    'linebreak-style': ['error', 'unix'],
    quotes: [2, 'single'],
    camelcase: 'off',
  },
  env: {
    browser: true,
    amd: true,
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2021,
  },
};
