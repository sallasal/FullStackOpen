import React from 'react'

const AddBlogForm = ({
  addBlog,
  setNewTitle,
  setNewAuthor,
  setNewUrl,
  newTitle,
  newAuthor,
  newUrl
}) => {
  return (
    <form onSubmit={addBlog}>
      Title: <input type='text' value={newTitle} name='title' id='title' onChange={(event) => {setNewTitle(event.target.value)}} /><br />
      Author: <input type='§text' value={newAuthor} name='author' id='author' onChange={(event) => {setNewAuthor(event.target.value)}} /><br />
      Url: <input type='text' value={newUrl} name='url' id='url' onChange={(event) => {setNewUrl(event.target.value)}} /><br />
      <button type='submit' id='submitButton'>Create new</button>
    </form>
  )
}

export default AddBlogForm