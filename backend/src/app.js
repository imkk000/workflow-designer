import cv from 'opencv4nodejs'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import functions from './functions'
import fs from 'fs'
import path from 'path'
import rimraf from 'rimraf'
import fileUpload from 'express-fileupload'
import { uploadFile, processFilesPath } from './imagePath'

const PORT = process.env.PORT || 1412
const app = express()
const router = express.Router()

app
  .use(cors())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use(fileUpload())
  .use('/api', router)
  .listen(PORT)

router
  .route('/process')
  .post((req, res) => {
    const { data } = req.body

    rimraf(processFilesPath(), async (err) => {
      if (err) return
    })

    res.json({ null: null })
  })

router
  .route('/upload')
  .post((req, res) => {
    try {
      if (!req.files) return res.status(400)

      const { name, mimetype, md5, mv } = req.files.file
      const fileName = uploadFile({ fileId: md5, fileExt: 'png' })

      if (!fs.existsSync(fileName)) mv(fileName)

      res.json({ fileId: md5 })
    } catch (err) {
      res.status(400)
    }
  })
