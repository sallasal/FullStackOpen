const list_helper = require('../utils/list_helper')

const emptyBlogs = []
const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

test('dummy returns one', () => {
  const result = list_helper.dummy(emptyBlogs)
  expect(result).toBe(7)
})

describe('total likes', () => {

  const typeWarList = blogs.filter((blog) => {
    return blog.title === 'Type wars'
  })

  test('emptyBlogs has 0 likes', () => {
    const result = list_helper.totalLikes(emptyBlogs)
    expect(result).toBe(0)
  })

  test('Type wars has 2 likes', () => {
    const result = list_helper.totalLikes(typeWarList)
    expect(result).toBe(2)
  })

  test('totalLikes is correct', () => {
    const result = list_helper.totalLikes(blogs)
    expect(result).toBe(36)
  })

})

describe('most liked', () => {
  test('returns most liked from the list', () => {
    const result = list_helper.mostLiked(blogs)
    const compareTo = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    }
    expect(result).toEqual(compareTo)
  })
})