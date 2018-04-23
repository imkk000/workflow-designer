import cv from 'opencv4nodejs'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

const PORT = process.env.PORT || 1412
const app = express()
const router = express.Router()

app
  .use(cors())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use('/api', router)
  .listen(PORT)

router
  .route('/process')
  .get(async (req, res) => {
    try {
      const img = cv.imreadAsync('')
    } catch (err) {
      console.error(err)
    }

    console.log('fix!')
    res.json({ null: null })
  })
