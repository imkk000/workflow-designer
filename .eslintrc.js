module.exports = {
  extends: ['airbnb', 'prettier'],
  plugins: ['babel', 'prettier'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 8,
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
  },
  rules: {
    'no-new': 0,
    'no-param-reassign': 0,
    'no-use-before-define': 0,
    'no-unused-vars': [
      1,
      {
        varsIgnorePattern: 'dom',
        argsIgnorePattern: 'res|next|^err',
      },
    ],
    'arrow-body-style': [2, 'as-needed'],
    'no-console': 0,
    quotes: [
      2,
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true,
      },
    ],
    semi: [2, 'never'],
    'prettier/prettier': [
      'error',
      {
        arrowParens: 'avoid',
        printWidth: 120,
        semi: false,
        singleQuote: true,
        tabWidth: 2,
        trailingComma: 'es5',
      },
    ],
    'jsx-a11y/href-no-hash': 'off',
    'jsx-a11y/anchor-is-valid': [
      'warn',
      {
        aspects: ['invalidHref'],
      },
    ],
    'react/react-in-jsx-scope': 'off'
  },
}
