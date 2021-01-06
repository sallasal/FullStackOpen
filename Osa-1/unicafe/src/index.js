import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({ headerText }) => (
  <h1>{headerText}</h1>
)

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const StatRow = ({ text, value }) => {
  return (
    <p>{text} {value}</p>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header headerText = 'Give feedback' />
      <Button handleClick = {() => setGood(good + 1)} text = 'good' />
      <Button handleClick = {() => setNeutral(neutral + 1)} text = 'neutral' />
      <Button handleClick = {() => setBad(bad + 1)} text = 'bad' />
      <Header headerText = 'Statistics' />
      <StatRow text = 'Good' value={good} />
      <StatRow text = 'Neutral' value = {neutral} />
      <StatRow text = 'Bad' value = {bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)