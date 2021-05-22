const list_helper = require('../utils/list_helper')
const dummy = list_helper.dummy

test('dummy returns one', () => {
  const blogs = []
  const result = dummy(blogs)
  expect(result).toBe(7)
})