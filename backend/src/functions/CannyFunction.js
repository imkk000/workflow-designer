import cv from 'opencv4nodejs'
import path from 'path'
import { sayFileName, saveFile } from './imagePath'

export default (data) => {
  return new Promise((resolve, reject) => {
    const fileName = sayFileName(data)
    const img = cv.imread(fileName)

    const { settings } = data
    const { threshold1, threshold2 } = settings

    const size = new cv.Size()
    const canny = img.canny(threshold1, threshold2)

    resolve(saveFile(canny))
  })
}
