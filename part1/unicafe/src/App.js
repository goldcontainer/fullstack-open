import React, { useState } from 'react'

const Header = (props) => <h1>{props.header}</h1>

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const Statistics = (props) => {
  if (isNaN(props.result)) {
    return (
      <p>{props.text} 0</p>
    )
  } 
  if (props.text === 'average' || props.text === 'positive') {
    return (
      <p>{props.text} {props.result}%</p>
    )
  } 
  return (
    <p>{props.text} {props.result}</p> 
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header header='give feedback'/>
      <Button text='good' handleClick={() => setGood(good + 1)} />
      <Button text='neutral' handleClick={() => setNeutral(neutral + 1)} />
      <Button text='bad' handleClick={() => setBad(bad + 1)} />
      <Header header='statistics' />
      <Statistics text='good' result={good} />
      <Statistics text='neutral' result={neutral} />
      <Statistics text='bad' result={bad} />
      <Statistics text='all' result={good + neutral + bad} />
      <Statistics text='average' result={(good - bad) / (good + neutral + bad)} />
      <Statistics text='positive' result={good / (good + neutral + bad)} />
    </div>
  )
}

export default App
