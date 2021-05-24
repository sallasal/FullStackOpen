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
    likes: 10
  },
  {
    author: 'Slalla',
    title: 'Slallakoodaa',
    url: 'http://sallakoodaa.com',
    likes: 11
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

test('id field is correctly returned', async () => {
  const response = await api.get('/api/blogs/')
  for (let i = 0; i < response.length; i++) {
    expect(response.body[i].id).toBeDefined()
  }
})

test('valid blog can be added', async () => {
  const newBlog = {
    author: 'Uusi-Slalla',
    title: 'New great blog',
    url: 'https://slalla-greatness.greatness',
    id: '3'
  }
  await api.post('/api/blogs').send(newBlog)
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initBlogs.length + 1)
})

afterAll(() => {
  mongoose.connection.close()
})