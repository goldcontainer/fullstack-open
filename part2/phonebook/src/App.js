import React, { useState } from 'react'
import Person from './components/Person'

const Header = (props) => <h2>{props.text}</h2>



const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]);

  // used for storing user-submitted inputs
  // setting the vallue attr of the input tag without an event handler
  // causes the App to control the behavior of the input element
  const [ newName, setNewName ] = useState('');


  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  }

  const addPerson = (event) => {
    event.preventDefault();

    const personObj = {
        name: newName
    }

    const found = persons.find(person => person.name === newName);

    if (found !== undefined) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat(personObj));
      setNewName('');
    }
  }

  return (
    <div>
      <Header text='Phonebook' />

      <div>debug: {newName}</div>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <Header text='Numbers' />
      {persons.map(person =>
        <Person key={person.id} name={person.name} />
      )}
    </div>
  )
}

export default App;