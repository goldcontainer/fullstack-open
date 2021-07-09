import React, { useState, useEffect } from 'react'
import People from './components/People'
import Notification from './components/Notification'
import Form from './components/Form'

import personService from './services/persons'

const Header = (props) => <h2>{props.text}</h2>

const App = () => {
  const [persons, setPersons] = useState([]);
  // used for storing user-submitted inputs
  // setting the value attr of the input tag without an event handler
  // causes the App to control the behavior of the input element
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber] = useState('');
  const [ filter, setNewFilter ] = useState('');
  const [ filteredPersons, setFilteredPersons ] = useState(null);
  const [ message, setMessage ] = useState(null);
  const [ messageType, setMessageType ] = useState('');

  useEffect(() => {
    personService.getAll().then(response => {
      setPersons(response);
    })
  }, [])

  const handleFilterChange = (event) => {
    // console.log(event.target.value);
    setNewFilter(event.target.value);
    const filterList = persons.filter(person => 
      person.name.toLowerCase().includes(event.target.value.toLowerCase()));
    setFilteredPersons(filterList);
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
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {

        const changedPerson = { ...found, number: personObj.number}

        personService
          .update(found.id, changedPerson).then(response => {
            setPersons(persons.map(person => person.id !== found.id ? person : changedPerson))
          })
          .catch(error => {
            setMessage(`${personObj.name} does not exist in phonebook`
            )
            setMessageType('error')
            setTimeout(() => {
              setMessage(null);
              setMessageType('');
            }, 5000)
          })

        setMessage(`Changed ${personObj.name}'s number`);
        setMessageType('notification')
        setTimeout(() => {
          setMessage(null);
          setMessageType('')
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
      setMessageType('notification')

      // setTimeout function calls the setMessage function after 5 seconds, which sets the message to value null
      setTimeout(() =>  {
        setMessage(null);
        setMessageType('');
      }, 5000);
    }
  }

  return (
    <div>
      <Header text='Phonebook' />
      <Notification message={message} messageType={messageType} />
      <div>filter shown with <input value={filter} onChange={handleFilterChange}/></div>
      
      <Header text='Add a New Contact' />
      <Form 
        onSubmit={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <Header text='Numbers' />

      <People
        persons={persons}
        filter={filter}
        filteredPersons={filteredPersons}
        toggleDelete={toggleDelete}
      />
    </div>
  )
}

export default App;