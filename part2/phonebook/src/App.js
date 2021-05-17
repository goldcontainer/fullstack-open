import React, { useState, useEffect } from 'react'
import Person from './components/Person'
import Notification from './components/Notification'

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
  const [ message, setMessage ] = useState(null);

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

  const toggleDelete = (person) => {
    if(window.confirm(`Delete ${person.name}?`)) {
      const deletedPerson = persons.find(p => p.id === person.id)

      personService.deletePerson(deletedPerson.id)
      setPersons(persons.filter(p => p.id !== person.id))

    }
  }

  const addPerson = (event) => {
    event.preventDefault();

    const personObj = {
        name: newName,
        number: newNumber,
    };

    const found = persons.find(person => person.name === newName);

    if (found !== undefined) {
      if(window.confirm(`${newName} is already added too phonebook, replace the old number with a new one?`)) {

        const changedPerson = { ...found, number: personObj.number}

        personService
          .update(found.id, changedPerson).then(response => {
            setPersons(persons.map(person => person.id !== found.id ? person : changedPerson))
          })

        setMessage(`Changed ${personObj.name}'s number`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      }
    } else {

      personService
        .create(personObj)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        })

      setPersons(persons.concat(personObj));
      setNewName('');
      setNewNumber('');
      setMessage(`Added ${personObj.name}`);

      // setTimeout function calls the setMessage function after 5 seconds, which sets the message to value null
      setTimeout(() =>  {
        setMessage(null);
      }, 5000);
    }
  }

  return (
    <div>
      <Header text='Phonebook' />
      <Notification message={message} />
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
        <Person key={person.id} name={person.name} number={person.number} toggleDelete={() => toggleDelete(person)}/>
      )}
      </div>
    </div>
  )
}

export default App;