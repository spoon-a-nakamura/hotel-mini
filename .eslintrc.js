module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'eslint:recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    // 'react',
    'react-hooks',
  ],
  rules: {
    // 'react/react-in-jsx-scope': 'off',
    // 'react/prop-types': 'off',
    // 'no-unused-vars': 'off',
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
