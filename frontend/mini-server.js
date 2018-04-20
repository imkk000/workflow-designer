const express = require('express')
const app = express()

app
  .use('/editor', express.static('dist'))
  .listen(9998)
