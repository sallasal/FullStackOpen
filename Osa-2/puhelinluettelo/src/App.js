import React, { useState, useEffect } from 'react'
import PersonService from './services/persons'

const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      Filter with <input value = {filter} onChange = {handleFilterChange} />
    </div>
  )
}

const Notification = ({ message, className }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={className}>
      {message}
    </div>
  )
}

const Person = ({ person, deletePerson }) => {

  return (
    <div> 
      {person.name}, {person.number} <button onClick={deletePerson}>Delete</button>
    </div>
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
  const [ completionMessage, setCompletionMessage] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)

  useEffect(() => {
    PersonService
      .getAll()
      .then(initPersons => {
        setPersons(initPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    if (!(persons.some((person) => person['name'] === newName))) {
      PersonService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })

      setCompletionMessage("Addition completed!")
      setTimeout(() => {
        setCompletionMessage(null)
      }, 3000)

    } else {
      if (window.confirm("Replace old number for this person?")) {
        const personToChange = persons.find(person => person.name === newName)
        const newPersonObject = {...personToChange, number: newNumber}
        const newPersons = persons.filter(person => person.id !== personToChange.id)

        PersonService
          .update(personToChange.id, newPersonObject)
          .then(returnedPerson => {
            setPersons(newPersons.concat(newPersonObject))

            setCompletionMessage("New number is saved!")
            setTimeout(() => {
              setCompletionMessage(null)
            }, 3000)
          })
          .catch(error => {
            setErrorMessage(`${personToChange.name} is already removed from the server`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 3000)
          })
  
      }
    }

    setNewName('')
    setNewNumber('')
  }

  const deletePersonNum = (id) => {
    if (window.confirm("Delete this number?")) {
      const newPersons = persons.filter(person => person.id !== id)

      PersonService
        .deleteThePerson(id)
      
      setPersons(newPersons)

      setCompletionMessage("Number is deleted!")
      setTimeout(() => {
        setCompletionMessage(null)
      }, 3000)
    }
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
      <Notification message={errorMessage} className='error'/>
      <Notification message={completionMessage} className='notification'/>
      <Filter filter = {filter} handleFilterChange = {handleFilterChange} />
      <h2>Add new</h2>
      <PersonForm addPerson = {addPerson} newName = {newName} newNumber = {newNumber} handleNameChange = {handleNameChange} handleNumberChange = {handleNumberChange}/>
      <h2>Numbers</h2>
      {personsToShow.map(person => 
        <Person person = {person} deletePerson = {() => deletePersonNum(person.id)} key = {person.name}/>)}
    </div>
  )

}

export default App
