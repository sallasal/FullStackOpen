import React from 'react'
import { connect } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'

const NewAnecdote = (props) => {
  console.log('Props: ', props)

  const add = async (event) => {
    event.preventDefault()
    const content = event.target.newAnecdote.value
    event.target.newAnecdote.value = ''
    props.addAnecdote(content)
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

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = {
  addAnecdote
}

const ConnectedForm = connect(mapStateToProps, mapDispatchToProps)(NewAnecdote)

export default ConnectedForm