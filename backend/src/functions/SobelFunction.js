import cv from 'opencv4nodejs'
import path from 'path'
import { readImage, writeImage } from '../imagePath'

export default (data) => {
  return new Promise((resolve, reject) => {
    const { img, settings } = readImage(data)
    const { ddepth, dx, dy } = settings

    const sobelImg = img.sobel(ddepth, dx, dy)

    resolve(writeImage(sobelImg))
  })
}
