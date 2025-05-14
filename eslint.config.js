/** @type {import('eslint').Linter.Config} */
module.exports = [
  {
    files: ['*.js', '*.ts'],
    rules: {
      'no-console': 'warn',
      'no-unused-vars': 'warn',
      'semi': ['error', 'always'],
      // Add other global rules here
    },
  },
  {
    files: ['*.ts', '*.tsx'],
    plugins: ['@typescript-eslint'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  },
];
