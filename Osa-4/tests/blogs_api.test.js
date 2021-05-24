const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initBlogs = [
  {
    author: 'Toby Ord',
    title: 'The Precipice',
    url: 'http://blog.fi',
    id: '60a3f7261f111082ed90991c'
  },
  {
    author: 'Slalla',
    title: 'Slallakoodaa',
    url: 'http://sallakoodaa.com',
    id: '60a4af059f80b1a60079530c'
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initBlogs[1])
  await blogObject.save()
})

test('current amount of blogs are returned as json', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initBlogs.length)
  expect(response.get('Content-Type')).toEqual('application/json; charset=utf-8')
})

test('id is correctly returned', async () => {
  const response = await api.get('/api/blogs/')
  for (let i = 0; i < response.length; i++) {
    expect(response.body[i].id).toBeDefined()
  }
})

afterAll(() => {
  mongoose.connection.close()
})