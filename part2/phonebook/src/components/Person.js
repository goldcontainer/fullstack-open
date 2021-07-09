import React from 'react'


const Person = ({ key, person, toggleDelete }) => {

	return (
		<li key={key}>
			{person.name} {person.number} <button onClick={() => toggleDelete(person)}>delete</button>
		</li>
	)
}

export default Person