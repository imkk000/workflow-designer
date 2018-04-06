import sum from './app'

test('add 1 + 1 to equals 2', () => {
  expect(sum(1, 1)).toBe(2)
})
