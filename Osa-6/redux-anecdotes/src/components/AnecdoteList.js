import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdotes = (props) => {
  console.log('Props: ', props)
  const allAnecdotes = props.anecdotes

  const filterObj = props.filterText
  const filterText = filterObj.filterText
  const anecdotes = (filterText.length === 0)
    ? allAnecdotes
    : allAnecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filterText))

  const vote = (anecdote) => {
    props.voteAnecdote(anecdote.id)
    props.setNotification(`Well done! You voted this anecdote: ${ anecdote.content }`, 5000)
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

const mapStateToProps = (state) => {
  console.log('State: ', state)
  return {
    anecdotes: state.anecdotes,
    filterText: state.filterText
  }
}

const mapDispatchToProps = {
  voteAnecdote,
  setNotification
}

const ConnectedAnecdotes = connect(mapStateToProps, mapDispatchToProps)(Anecdotes)

export default ConnectedAnecdotes