module.exports = {
    root: true,
    env: {
      node: true,
    },
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
    },
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended',
    ],
    plugins: ['simple-import-sort', '@typescript-eslint'],
    rules: {
      'prettier/prettier': ['error', {}, { usePrettierrc: true }],
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
    },
  };
  
  