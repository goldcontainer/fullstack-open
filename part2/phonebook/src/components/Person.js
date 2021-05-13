import React from 'react'


const Person = (props) => {

	console.log(props)

	return (
		<li key={props.id}>
			{props.name} {props.number} <button onClick={props.toggleDelete}>delete</button>
		</li>
	)
}

export default Person