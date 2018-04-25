import cv from 'opencv4nodejs'
import path from 'path'
import { readImage, writeImage } from '../imagePath'

export default (data) => {
  return new Promise((resolve, reject) => {
    const { img, settings } = readImage(data)
    const { sigmaX, sigmaY } = settings

    const size = new cv.Size(0, 0)
    const gaussianImg = img.gaussianBlur(size, Number(sigmaX), Number(sigmaY))

    resolve(writeImage(gaussianImg))
  })
}
