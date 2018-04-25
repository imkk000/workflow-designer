import cv from 'opencv4nodejs'
import path from 'path'
import { readImage, writeImage } from '../imagePath'

export default (data) => {
  return new Promise((resolve, reject) => {
    const { img } = readImage(data)

    const grayImg = img.bgrToGray()

    resolve(writeImage(grayImg))
  })
}
