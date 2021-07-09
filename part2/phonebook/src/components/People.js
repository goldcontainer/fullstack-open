import React from 'react'
import Person from './Person'

const People = ({ filter, persons, filteredPersons, toggleDelete }) => (
  <div className="persons">
    {filter === ""
      ? persons?.map(person => (
          <Person
            key={person.name}
            person={person}
            toggleDelete={toggleDelete}
          />
        ))
      : filteredPersons?.map(person => (
          <Person
            key={person.name}
            person={person}
            toggleDelete={toggleDelete}
          />
        ))}
  </div>
);

export default People;