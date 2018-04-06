module.exports = {
  extends: 'airbnb',
  plugins: ['babel'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 8,
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
  },
  rules: {
    semi: [2, 'never'],
  }
}
