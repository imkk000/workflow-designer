import cv from 'opencv4nodejs'
import path from 'path'
import { readImage, writeImage } from '../imagePath'

export default (data) => {
  return new Promise((resolve, reject) => {
    // FIXME: not working
    const { img, settings } = readImage(data)
    const { angle } = settings

    const [height, width] = img.sizes
    const centerX = width / 2
    const centerY = height / 2
    const centerPoint = new cv.Point2(centerX, centerY)
    const rotMat2D = cv.getRotationMatrix2D(centerPoint, angle)
    const newMat = img.warpAffine(rotMat2D, new cv.Size(width, height))
    const cos = Math.abs(rotMat2D.at(0, 0))
    const sin = Math.abs(rotMat2D.at(0, 1))
    const newWidth = Math.floor((height * sin) + (width * cos))
    const newHeight = Math.floor((height * cos) + (width * sin))
    const newSize = new cv.Size(newWidth, newHeight)

    rotMat2D.set(0, 2, rotMat2D.at(0, 2) + (newWidth / 2) - centerX)
    rotMat2D.set(1, 2, rotMat2D.at(1, 2) + (newHeight / 2) - centerY)

    const newMat = img.warpAffine(rotMat2D, newSize)
    const tmpImg = new cv.Mat(width, height, cv.CV_8UC4, [255, 255, 255, 255])
      .bgrToGray()
      .warpAffine(rotMat2D, newSize)

    const rgb = newMat.split()
    const alpha = tmpImg.threshold(0, 255, cv.THRESH_BINARY)
    const newMatTransparent = new cv.Mat([...rgb, alpha])

    resolve(writeImage(newMatTransparent))
  })
}
