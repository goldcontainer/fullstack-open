import React from 'react'

const Person = (props) => {

	console.log(props)

	return (
		<li>{props.name}</li>
	)
}

export default Person