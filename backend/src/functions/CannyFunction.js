import cv from 'opencv4nodejs'
import path from 'path'
import { readImage, writeImage } from '../imagePath'

export default (data) => {
  return new Promise((resolve, reject) => {
    const { img, settings } = readImage(data)
    const { threshold1, threshold2 } = settings

    const cannyImg = img.canny(Number(threshold1), Number(threshold2))

    resolve(writeImage(cannyImg))
  })
}
