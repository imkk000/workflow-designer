import path from 'path'
import fs from 'fs'
import cv from 'opencv4nodejs'
import md5file from 'md5-file'

const rootPath = path.join(__dirname, '..', '..')

export const uploadFilesPath = path.join(rootPath, 'upload_files')
export const processFilesPath = path.join(rootPath, 'process_files')
export const tempFile = path.join(processFilesPath, 'temp_process.png')
export const uploadFile = ({ fileId, fileExt }) => path.join(uploadFilesPath, `${fileId}.${fileExt}`)
export const processFile = ({ fileId, fileExt }) => path.join(processFilesPath, `${fileId}.${fileExt}`)
export const sayFileName = (data) => {
  if (!data) return
  if (!fs.existsSync(processFilesPath)) fs.mkdirSync(processFilesPath)

  const { type, files } = data

  if (Array.isArray(files))
    return files.map((file) => processFile(file))

  return type === 'LoadImageFunction' ? uploadFile(files) : processFile(files)
}
export const saveFile = (img = new cv.Mat(), fileName = tempFile) => {
  try {
    if (fs.existsSync(fileName)) fs.unlinkSync(fileName)
    cv.imwrite(fileName, img)

    const hash = md5file.sync(fileName)
    const files = { fileId: hash, fileExt: 'png' }
    const newFile = processFile(files)
    fs.renameSync(fileName, newFile)
    return newFile
  } catch (err) {
    console.error(err)
  }

  return
}
