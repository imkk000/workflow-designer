import cv from 'opencv4nodejs'
import path from 'path'
import { readImage, writeImage } from '../imagePath'

export default (data) => {
  return new Promise((resolve, reject) => {
    const { img, settings } = readImage(data)
    const { threshold1, threshold2 } = settings

    const cannyImage = img.canny(threshold1, threshold2)

    resolve(writeImage(cannyImage))
  })
}
