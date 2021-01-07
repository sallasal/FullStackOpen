import React from 'react'

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
        <h2>{props.course}</h2>
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

  export default Course