import hashString from 'string-hash'

export const generateId = () => {
  const date = Date().toString()
  const salt = Math.random() * 999990
  const hashData = date + salt
  const hashResult = hashString(hashData)
  const hashResultPadding = hashResult.toString().padStart(11, '0')
  return hashResultPadding
}
