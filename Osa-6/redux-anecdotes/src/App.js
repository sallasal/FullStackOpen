import React from 'react'
import Anecdotes from './components/AnecdoteList'
import NewAnecdote from './components/AnecdoteForm'
import Notification from './components/Notification'
import Filter from './components/Filter'

const App = () => {

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <br />
      <Anecdotes />
      <NewAnecdote />
    </div>
  )
}

export default App