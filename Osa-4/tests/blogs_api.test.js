const mongoose = require('mongoose')
const supertest = require('supertest')
const testHelper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(testHelper.initBlogs[0])
  await blogObject.save()
  blogObject = new Blog(testHelper.initBlogs[1])
  await blogObject.save()
})

test('current amount of blogs are returned as json', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(testHelper.initBlogs.length)
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
    likes: 7
  }
  await api.post('/api/blogs').send(newBlog)
  const response = await testHelper.blogsInDb()
  expect(response).toHaveLength(testHelper.initBlogs.length + 1)
})

test('if likes not set returns 0', async () => {
  const newBlog = {
    author: 'Bloggaaja',
    title: 'Bloggonen',
    url: 'www.blogity.blog'
  }
  await api.post('/api/blogs').send(newBlog)
  const response = await testHelper.blogsInDb()
  const newBlogObject = response.find((blog) => blog.title === 'Bloggonen')
  expect(newBlogObject.likes).toBe(0)
})

test('post without url or title returns 400', async () => {
  const noUrl = {
    author: 'Bloggaaja',
    title: 'Blogi',
    likes: 3
  }
  const noTitle = {
    author: 'Bloggaaja',
    url: 'http://blogi',
    likes: 7
  }
  await api.post('/api/blogs').send(noUrl).expect(400)
  await api.post('/api/blogs').send(noTitle).expect(400)
})

afterAll(() => {
  mongoose.connection.close()
})