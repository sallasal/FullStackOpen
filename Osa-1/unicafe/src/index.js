import React, { useState } from 'react'
import ReactDOM from 'react-dom'

//
// Layout parts
//

const Header = ({ headerText }) => (
  <h1>{headerText}</h1>
)

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  if (good + neutral + bad === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }

  let average = <Avg good = {good} neutral = {neutral} bad = {bad} /> 
  let positive = <Percent good = {good} neutral = {neutral} bad = {bad} />

  return (
    <div>
      <StatisticLine text = 'Good' value={good} />
      <StatisticLine text = 'Neutral' value = {neutral} />
      <StatisticLine text = 'Bad' value = {bad} />
      <StatisticLine text = 'All' value = {bad + neutral + good} />
      <StatisticLine text = 'Average' value = {average} />
      <StatisticLine text = 'Positive' value = {positive} />
    </div>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
    <p>{text} {value}</p>
  )
}

//
// Help functions
//

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

  return `${percent} %`
}

//
// The application
//

const App = () => {
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
      <Statistics good = {good} neutral = {neutral} bad = {bad} />

    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)