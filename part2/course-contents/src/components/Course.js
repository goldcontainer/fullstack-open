import React from 'react'

const Course = ({ course }) => {
	return (
		<> 
			<Header course={course.name} />
			<Content parts={course.parts} />
			<Total parts={course.parts} />
		</>
	)
}

const Header = ({ course }) => <h1>{course}</h1>

const Content = ({ parts }) => {
	return (
		<div>
			{parts.map(({name, exercises, id}) => (
				<Part key={id} name={name} exercises={exercises} />
			))}
		</div>
	)
}

const Part = ({ name, exercises }) => <p>{name} {exercises}</p>

const Total = ({ parts }) => {
	const total = parts.reduce(
		(accumulator, currentValue) => accumulator + currentValue.exercises, 0
	);

	console.log(total)

	return (
		<p>total of {total} exercises</p>
	)
}


export default Course