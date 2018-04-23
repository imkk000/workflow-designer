import cv from 'opencv4nodejs'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import functions from './functions'
import fs from 'fs'
import path from 'path'
import rimraf from 'rimraf'

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
    const { data } = req.body
    res.json({ null: null })
  })

const data = {
  files: [
    {
      fileId: 'tux_profile',
      fileExt: 'png',
    },
  ]
}
const oneData = {
  type: 'LoadImageFunction',
  files: {
    fileId: 'tux_profile',
    fileExt: 'png',
  }
}
const twoData = {
  type: 'RotateFunction',
  settings: {
    angle: 45,
  },
  files: {
    fileId: '6127a6f5675926f55141c7145d48242f',
    fileExt: 'png',
  }
}

rimraf(path.join(__dirname, '..', 'process_files'), (err) => {
  if (err) return

  functions['LoadImageFunction'](oneData)
  functions['RotateFunction'](twoData)
})
