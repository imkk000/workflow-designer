import cv from 'opencv4nodejs'
import path from 'path'
import { sayFileName, saveFile } from './imagePath'

export default (data) => {
  const fileName = sayFileName(data)
  const img = cv.imread(fileName)
  return saveFile(img)
}
