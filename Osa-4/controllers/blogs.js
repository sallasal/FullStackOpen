const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const { resource } = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')

const getTokenFrom = req => {
  const auth = req.get('authorization')
  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    return auth.substring(7)
  }
  return null
}

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
  res.json(blogs)
})

blogsRouter.post('/', async (req, res, next) => {
  const body = req.body
  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!req.token||!decodedToken.id) {
    return res.status(401).json({ error: 'Token is missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    author: body.author,
    title: body.title,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  res.json(savedBlog.toJSON())

})

blogsRouter.delete('/:id', async (req, res, next) => {
  const body = req.body
  try {
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    if (!req.token||!decodedToken.id) {
      return res.status(401).json({ error: 'Token is missing or invalid' })
    }
  } catch (error) {
    return res.status(401).json({ error: 'Token is missing or invalid' })
  }

  await Blog.findByIdAndRemove(req.params.id)
  res.status(204).end()
})

blogsRouter.put('/:id', async (req, res, next) => {
  const body = req.body
  const blog = {
    author: body.author,
    title: body.title,
    url: body.url,
    likes: body.likes
  }

  const changedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
  res.json(changedBlog.toJSON())
})

module.exports = blogsRouter