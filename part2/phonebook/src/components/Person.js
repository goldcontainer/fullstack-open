import React from 'react'


const Person = ({ key, person, toggleDelete }) => {

	return (
		<li key={key}>
			{key} {person.number} <button onClick={toggleDelete}>delete</button>
		</li>
	)
}

export default Person