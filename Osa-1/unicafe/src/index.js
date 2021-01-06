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

const Avg = ({ good, neutral, bad }) => {
  let avg = 0
  
  if (good + neutral + bad === 0) {
    avg = 0
  } else (
    avg = (good - bad) / (good + neutral + bad)
  )

  return avg
}

const Percent = ({ good, neutral, bad }) => {
  let percent = 0

  if (good + neutral + bad === 0) {
    percent = 0
  } else {
    percent = good*100/(good + neutral + bad)
  }

  return percent
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  let average = <Avg good = {good} neutral = {neutral} bad = {bad} /> 
  let positive = <Percent good = {good} neutral = {neutral} bad = {bad} />

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
      <StatRow text = 'All' value = {bad + neutral + good} />
      <StatRow text = 'Average' value = {average} />
      <StatRow text = 'Positive' value = {positive} />

    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)