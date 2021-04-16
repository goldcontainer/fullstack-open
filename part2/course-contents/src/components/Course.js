import React from 'react'

const Course = ({ course }) => {
	<> 
		<Header course={course.name} />
		<Content parts={course.parts} />
	</>
}

const Header = ({ course }) => <h1>{course}</h1>

const Content = ({ parts }) => {
	return (
		<>
			{parts.map(({ text, exercises, id}) => (
				<Part key={id} text={text} exercises={exercises} />
			))}
		</>
	)
}

const Part = ({ text, exercises }) => <p>{text} {exercises}</p>

export default Course