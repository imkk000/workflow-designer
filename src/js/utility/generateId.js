import crypto from 'crypto'

export const generateId = () => {
  // TODO: build a hash table or use UUID to support unique ID generation
  return crypto.randomBytes(16).toString('hex')
}
