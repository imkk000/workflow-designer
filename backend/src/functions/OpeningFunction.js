import cv from 'opencv4nodejs'
import path from 'path'
import { readImage, writeImage } from '../imagePath'

export default (data) => {
  return new Promise((resolve, reject) => {
    const { img, settings } = readImage(data)
    const { kSizeWidth, kSizeHeight } = settings

    const kSize = new cv.Mat(Number(kSizeWidth), Number(kSizeHeight))
    const openImg = img.morphologyEx(kSize, cv.MORPH_OPEN)

    resolve(writeImage(openImg))
  })
}
