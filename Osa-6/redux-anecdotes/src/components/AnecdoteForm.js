import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'

const NewAnecdote = (props) => {
  const dispatch = useDispatch()

  const add = (event) => {
    event.preventDefault()
    const content = event.target.newAnecdote.value
    event.target.newAnecdote.value = ''
    dispatch(addAnecdote(content))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={ add }>
        <div><input name="newAnecdote" /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default NewAnecdote