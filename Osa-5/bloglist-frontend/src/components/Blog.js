import PropTypes from 'prop-types'
import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({blog, setBlogs, blogs}) => {
  const [blogInfo, showAllInfo] = useState(false)
  const user = blog.user
  let username = 'No user defined'
  if (user) {
    username = user.name
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    width: 500
  }

  const allInfo = { display: blogInfo ? '' : 'none' }
  const limitedInfo = { display: blogInfo ? 'none' : '' }

  const showInfo = () => {
    showAllInfo(!blogInfo)
  }

  const like = async () => {
    const data = {
      user: user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      id: blog.id
    }
    const res = await blogService.put(data)
    const newBlogArray = blogs.map((instance) => (instance.id !== res.id ? instance : res))
    newBlogArray.sort((a,b) => a.likes - b.likes)
    setBlogs(newBlogArray)
  }

  const del = async () => {
    const blogId = blog.id
    if (window.confirm('Really deleting you are?')) {
      await blogService.deleteBlog(blogId)
      const newBlogArray = blogs.filter((instance) => instance.id !== blogId)
      newBlogArray.sort((a,b) => a.likes - b.likes)
      setBlogs(newBlogArray)
    }
  }

  return (
    <div style={ blogStyle }>
      <div style={ limitedInfo } className='limitedBlogInfo'>
        Title: { blog.title }<br />
        Author: { blog.author }<br />
        <button onClick={ showInfo }>Show</button>
      </div> 
      <div style={ allInfo } className='fullBlogInfo'>
        Title: { blog.title }<br />
        Author: { blog.author }<br />
        URL: { blog.url }<br />
        Likes: { blog.likes }<button onClick={like}>Like</button><br />
        Creator: { username }<br />
        <button onClick={ showInfo }>Hide</button> <button onClick = { del }>Delete</button>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired
}

export default Blog