import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const Anecdotes = () => {
  const allAnecdotes = useSelector(state => state.anecdotes)
  console.log('All anecdotes: ', allAnecdotes)
  const dispatch = useDispatch()
  const filterObj = useSelector(state => state.filterText)
  const filterText = filterObj.filterText
  const anecdotes = (filterText.length === 0)
    ? allAnecdotes
    : allAnecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filterText))
  console.log('Anecdotes to show: ', anecdotes)

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote.id))
    dispatch(setNotification(`Well done! You voted this anecdote: ${ anecdote.content }`, 5000))
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Anecdotes