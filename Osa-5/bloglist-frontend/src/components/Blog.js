import React, { useState } from 'react'

const Blog = ({blog}) => {
  const [blogInfo, showAllInfo] = useState(false)

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

  return (
    <div style={ blogStyle }>
      <div style={ limitedInfo }>
        Title: { blog.title }<br />
        Author: { blog.author }<br />
        <button onClick={ showInfo }>Show</button>
      </div> 
      <div style={ allInfo }>
        Title: { blog.title }<br />
        Author: { blog.author }<br />
        URL: { blog.url }<br />
        Likes: { blog.likes }<br />
        <button onClick={ showInfo }>Hide</button>
      </div>
    </div>
  )
}

export default Blog