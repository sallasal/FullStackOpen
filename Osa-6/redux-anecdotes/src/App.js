import React from 'react'
import Anecdotes from './components/AnecdoteList'
import NewAnecdote from './components/AnecdoteForm'

const App = () => {

  return (
    <div>
      <h2>Anecdotes</h2>
      <Anecdotes />
      <NewAnecdote />
    </div>
  )
}

export default App