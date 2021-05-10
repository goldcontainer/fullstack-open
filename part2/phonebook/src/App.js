import React, { useState, useEffect } from 'react'
import Person from './components/Person'

import personService from './services/persons'

const Header = (props) => <h2>{props.text}</h2>

const App = () => {
  const [persons, setPersons] = useState([]);

  // used for storing user-submitted inputs
  // setting the vallue attr of the input tag without an event handler
  // causes the App to control the behavior of the input element
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber] = useState('');
  const [ filter, setNewFilter ] = useState('');

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  // array of filtered people
  const filterList = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()));

  const handleFilterChange = (event) => {
    // console.log(event.target.value);
    setNewFilter(event.target.value);
  }

  const handleNameChange = (event) => {
    // console.log(event.target.value);
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    // console.log(event.target.value);
    setNewNumber(event.target.value);
  }

  const addPerson = (event) => {
    event.preventDefault();

    const personObj = {
        name: newName,
        number: newNumber,
    };

    personService
      .create(personObj)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
      })

    const found = persons.find(person => person.name === newName);

    if (found !== undefined) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat(personObj));
      setNewName('');
      setNewNumber('');
    }
  }

  return (
    <div>
      <Header text='Phonebook' />
      <div>filter shown with <input value={filter} onChange={handleFilterChange}/></div>
      
      <Header text='Add a New Contact' />
      <form onSubmit={addPerson}>
        <div>name: <input value={newName} onChange={handleNameChange} /></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <Header text='Numbers' />
      <div>
      {filterList.map(person =>
        <Person id={person.id} name={person.name} number={person.number} />
      )}
      </div>
    </div>
  )
}

export default App;