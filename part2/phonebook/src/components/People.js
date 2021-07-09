import React from 'react'
import Person from './Person'

const People = ({ persons, filter, filteredPersons, toggleDelete }) => (
		<div>
			{filter === ""
				? persons?.map(person => {
					<Person
						key={person.name}
						person={person}
						toggleDelete={toggleDelete}
						/>
					})
				: filteredPersons?.map(person => {
					<Person
						key={person.name}
						person={person}
						toggleDelete={toggleDelete}
						/>	
				})
			}
		</div>
	
)

export default People