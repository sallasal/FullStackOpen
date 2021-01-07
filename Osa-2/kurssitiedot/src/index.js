import React from 'react'
import ReactDOM from 'react-dom'

const Course = ({ course }) => {
  return (
    <div>
      <Header course = {course.name}/>
      <Content parts = {course.parts}/>
      <Total parts = {course.parts}/>
    </div>
  )
}

const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Content = ({ parts }) =>  {
  return (
    <div>
      {parts.map(part =>
        <Part key = {part.id} part = {part}/>
      )}
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>{props.part.name} {props.part.exercises}</p>
    </div>
  )
}

const Total = ({ parts }) => {
  const values = parts.map(part => part.exercises)
  const total = values.reduce((sum, value) => sum + value,0)
  return (<p><strong>Total of {total} exercises</strong></p>)
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Sallas part',
        exercises: 3,
        id: 4
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))