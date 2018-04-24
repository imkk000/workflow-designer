import cv from 'opencv4nodejs'
import path from 'path'
import { readImage, writeImage } from '../imagePath'

export default (data) => {
  return new Promise((resolve, reject) => {
    const { img, settings } = readImage(data)
    const { thresh, maxVal } = settings

    const thresholdImg = img.threshold(Number(thresh), Number(maxVal), cv.THRESH_BINARY)

    resolve(writeImage(thresholdImg))
  })
}
