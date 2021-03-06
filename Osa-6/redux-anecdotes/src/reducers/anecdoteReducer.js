import anecdoteService from '../services/anecdotes'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE_ANECDOTE',
    data: { id }
  }
}

export const addAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
        type: 'ADD_ANECDOTE',
        data: newAnecdote
      })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
  

}

const compare = (a,b) => {
  if ( a.votes > b.votes ) {
    return -1
  } else if ( a.votes < b.votes ) {
    return 1
  } else {
    return 0
  }
}

const anecdoteReducer = (state = [], action) => {
  //console.log('state now: ', state)
  //console.log('action', action)
  switch(action.type) {
    case 'VOTE_ANECDOTE':
      const anecdoteToVote = state.find(a => a.id === action.data.id)
      const updatedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      }
      const votedArray = state.map( a => a.id !== action.data.id ? a : updatedAnecdote)
      const sortedVoted = votedArray.sort(compare)
      return sortedVoted
    case 'ADD_ANECDOTE':
      const addedArray = [...state, action.data]
      const sortedAdded = addedArray.sort(compare)
      return sortedAdded

    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export default anecdoteReducer