import { randomBytes } from 'crypto'

export default () => {
  // TODO: generate hash by crypto randomByte
  const dataByteSize = 16
  const dataBytes = randomBytes(dataByteSize)
  const hashData = dataBytes.toString('hex')
  return hashData
}