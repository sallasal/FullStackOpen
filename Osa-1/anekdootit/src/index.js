import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({ text }) => (
  <h1>{text}</h1>
)

const MostVoted = ({ text, voteCount }) => {
  return (
    <div>
      <p>{text}</p>
      <p>has {voteCount} votes</p>
    </div>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, addVote] = useState(new Array(6+1).join('0').split('').map(parseFloat))
  const [largest, changeLargest] = useState(0)

  const handleVoteClick = () => {
    const copy = [...votes]
    copy[selected] = copy[selected] + 1
    if (copy[selected] > copy[largest]) {
      changeLargest(selected)
    }
    addVote(copy)
  }

  return (
    <div>
      <Header text = 'Anecdote of the day'/>
      <p>{props.anecdotes[selected]}</p>
      <p>Has {votes[selected]} votes</p>
      <button onClick = {() => setSelected(Math.floor(Math.random() * 6))}>Get new</button>
      <button onClick = {handleVoteClick}>Vote</button>
      <Header text = 'Most voted anecdote'/>
      <MostVoted text = {props.anecdotes[largest]} voteCount = {votes[largest]} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)