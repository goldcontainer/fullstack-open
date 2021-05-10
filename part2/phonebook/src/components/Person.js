import React from 'react'

import personService from '../services/persons'

const Person = (props) => {

	console.log(props)

	const handleClick = (event) => {

		if(window.confirm(`Delete ${props.name}?`)) {
			personService
				.deletePerson(props.id)
		}
	}

	return (
		<li key={props.id}>
			{props.name} {props.number} <button onClick={handleClick}>delete</button>
		</li>
	)
}

export default Person