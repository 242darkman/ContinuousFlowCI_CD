module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'airbnb-base',
    'eslint:recommended',
    'prettier',
  ],
  overrides: [
    {
      "files": ["vite.config.js"],
      "rules": {
        "import/no-extraneous-dependencies": "off"
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'vue',
  ],
  rules: {
    'vue/require-default-prop': 'off',
    'import/no-unresolved': 'error',
    'import/prefer-default-export': 'off',
    'import/extensions': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', './src'],
        ],
        extensions: ['.js', '.jsx', '.vue', '.json'],
      },
    },
  },
};
