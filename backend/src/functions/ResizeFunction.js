import cv from 'opencv4nodejs'
import path from 'path'
import { readImage, writeImage } from '../imagePath'

export default (data) => {
  return new Promise((resolve, reject) => {
    const { img, settings } = readImage(data)
    const { rowsPercent, colsPercent } = settings

    const [width, height] = img.sizes
    let newWidth = width + (width * rowsPercent / 100)
    let newHeight = height + (height * colsPercent / 100)

    if (newWidth <= 0) newWidth = width
    if (newHeight <= 0) newHeight = height

    const resizeImg = img.resize(Number(newWidth), Number(newHeight))

    resolve(writeImage(resizeImg))
  })
}
