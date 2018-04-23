import cv from 'opencv4nodejs'
import path from 'path'
import { readImage, writeImage } from '../imagePath'

export default (data) => {
  return new Promise((resolve, reject) => {
    const { img, settings } = readImage(data)
    const { kSizeWidth, kSizeHeight } = settings

    const size = new cv.Mat(kSizeWidth, kSizeHeight)
    const erodeImg = img.erode(size)

    resolve(writeImage(erodeImg))
  })
}
