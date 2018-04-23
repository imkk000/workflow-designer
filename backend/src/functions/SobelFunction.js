import cv from 'opencv4nodejs'
import path from 'path'
import { readImage, writeImage } from '../imagePath'

export default (data) => {
  return new Promise((resolve, reject) => {
    const { img, settings } = readImage(data)
    const { dx, dy } = settings

    console.log(img)
    const sobelImg = img.sobel(img.depth, 1, 0)

    resolve(writeImage(sobelImg))
  })
}
