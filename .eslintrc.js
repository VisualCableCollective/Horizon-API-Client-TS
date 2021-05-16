module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: './tsconfig.json',
    },
    rules: {
      '@typescript-eslint/no-use-before-define': 'off',
      '@typescript-eslint/lines-between-class-members': 'off',
      'import/prefer-default-export': 'off',
    },
    plugins: [
      '@typescript-eslint',
    ],
    extends: [
      'airbnb-typescript',
    ],
  };