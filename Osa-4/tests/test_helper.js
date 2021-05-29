const Blog = require('../models/blog')
const user = require('../models/user')

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

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async() => {
  const users = await user.find({})
  return users.map(user => user.toJSON())
}

const nonExistingId = async () => {
  const blog = new Blog({ author: 'No one', title: 'Nothing', url: 'Nowhere' })
  await blog.save()
  await blog.remove()
  return blog._id.toString()
}

module.exports = {
  blogsInDb,
  initBlogs,
  nonExistingId,
  usersInDb
}