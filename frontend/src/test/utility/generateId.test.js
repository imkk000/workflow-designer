import generateId from '../../js/utility/generateId'

test('generateId', () => {
  const id = generateId()

  expect(id).toBeDefined()
  expect(id).not.toBeNull()
  expect(id).not.toBeUndefined()
  expect(id).toHaveLength(32)
})
