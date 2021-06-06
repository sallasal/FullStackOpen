import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    console.log('here we are')
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      alert('Wrong credentials')
    }
  }

  const Header = () => {
    return <div>
      <h1>Blog application</h1>
    </div>
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
      <h2>Blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App