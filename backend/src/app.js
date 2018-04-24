import cv from 'opencv4nodejs'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import functions from './functions'
import fs from 'fs'
import path from 'path'
import rimraf from 'rimraf'
import fileUpload from 'express-fileupload'
import { uploadFile, processFilesPath, uploadFilesPath } from './imagePath'

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
  .post(async (req, res) => {
    const { id, type, files, settings } = req.body
    try {
      const fileId = await functions[type](req.body)

      res
        .status(200)
        .json({
          fileId
        })
    } catch (error) {
      console.error(error)
      res.status(400)
    }
  })

router
  .route('/upload')
  .post((req, res) => {
    try {
      if (!req.files) return res.status(400)

      const { name, mimetype, md5, mv } = req.files.file
      const fileIdResult = { fileId: md5 }
      const fileName = uploadFile(fileIdResult)

      if (!fs.existsSync(fileName)) mv(fileName)

      res.json(fileIdResult)
    } catch (err) {
      res.status(400)
    }
  })

router
  .route('/clear')
  .post((req, res) => {
    rimraf.sync(uploadFilesPath)
    rimraf.sync(processFilesPath)

    if (!fs.existsSync(uploadFilesPath)) fs.mkdirSync(uploadFilesPath)
    if (!fs.existsSync(processFilesPath)) fs.mkdirSync(processFilesPath)

    res.status(200)
  })
