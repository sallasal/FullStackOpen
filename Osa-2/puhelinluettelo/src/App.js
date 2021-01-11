import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      Filter with <input value = {filter} onChange = {handleFilterChange} />
    </div>
  )
}
 
const ListNumbers = ({ personsToShow }) => {
  return (
    personsToShow.map(person => <div key = {person.name}> {person.name}, {person.number}</div>)
  )
}

const PersonForm = (props) => {
  return (
      <form onSubmit = {props.addPerson}>
        <div>
        name: <input value = {props.newName} onChange = {props.handleNameChange}/>
      </div>
      <div>
        number: <input value = {props.newNumber} onChange = {props.handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
  </form>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('fulfilled')
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }

    if (!(persons.some((person) => person['name'] === newName))) {
      setPersons(persons.concat(nameObject))
    } else {
      alert(`${newName} is already added to the phonebook`)
    }

    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)

  }

  const personsToShow = (filter.length === 0)
    ? persons
    : persons.filter(person => person.name.includes(filter))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter = {filter} handleFilterChange = {handleFilterChange} />
      <h2>Add new</h2>
      <PersonForm addPerson = {addPerson} newName = {newName} newNumber = {newNumber} handleNameChange = {handleNameChange} handleNumberChange = {handleNumberChange}/>
      <h2>Numbers</h2>
      <ListNumbers personsToShow = {personsToShow}/>
    </div>
  )

}

export default App
