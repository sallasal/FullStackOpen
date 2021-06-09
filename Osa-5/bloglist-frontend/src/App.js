import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import AddBlogForm from './components/AddBlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification ] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notifyWith = (message, type) => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      notifyWith('Login succeeded', 'success')
    } catch (exception) {
      notifyWith('Wrong credentials', 'error')
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogAppUser')
    blogService.setToken(null)
    setUser(null)
    setUsername('')
    setPassword('')
  }

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }
    try {
      const createdBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(createdBlog))
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
      notifyWith(`Blog was created. Title: ${createdBlog.title}. Author: ${createdBlog.author}`, 'success')
    } catch (exception) {
      notifyWith('Adding blog did not succeed', 'error')
    }
  }

  const Header = () => {
    return <div>
      <h1>Blog application</h1>
      <Notification notification = {notification} />
    </div>
  }

  const addBlogForm = () => {
    return (
      <div>
        <AddBlogForm 
            addBlog={addBlog}
            setNewTitle={setNewTitle}
            setNewAuthor={setNewAuthor}
            setNewUrl={setNewUrl}
            newTitle={newTitle}
            newAuthor={newAuthor}
            newUrl={newUrl}
        />
      </div>
    )
  }

  if (user === null) {
    return (
      <div> 
        <Header />
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            Username: <input type='text' value={username} name='Username' onChange={ ({ target }) => setUsername(target.value)}/>
            </div>
          <div>
            Password: <input type='password' value={password} name='Password' onChange={ ({ target }) => {setPassword(target.value)}}/>
          </div>
          <button type='submit'>Login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <Header />
      <p>{user.name} is logged in.</p>
      <p>
        <button onClick={handleLogout}>Logout</button>
      </p>
      {addBlogForm()}
      <h2>Blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App