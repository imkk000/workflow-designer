module.exports = Object.assign(
  {
    env: {
      browser: true,
      node: true,
      es6: true,
      jquery: true,
      jest: true,
    },
    globals: {
      d3: true,
    },
  },
  require('../.eslintrc')
)
