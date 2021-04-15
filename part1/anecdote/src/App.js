import React, { useState } from 'react'

const Header =(props) => <h1>{props.text}</h1>

const Button = (props) => <button onClick={props.handleClick}>{props.text}</button>

const Anecdote = (props) => {
  return (
    <>
      {props.anecdote}
      <br />
      has {props.votes} votes(s)
    </>
  )
}

const App = () => {
  const anecdotes = [
    "I think the best way to get ahead in life is to be consistent",
    "Life works in mysterious ways that are not known to us until looking at it backwards",
    "Technology is always changing, but we should never give up our humanity",
    "Relationships are meaningful if given the right amount of responsibility"
  ]
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  const [selected, setSelected] = useState(0)

  const randomNumber = (len) => {
    return Math.floor(Math.random() * len);
  }

  let randomIndex = randomNumber(anecdotes.length);

  const countVote = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);

  }

  return (
    <div>
      <Header text="Anecdote of the day" />

      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]} />
      <br />
      <Button handleClick={() => countVote()} text="vote" />
      <Button handleClick={() => setSelected(randomIndex)} text="next anecdote" />

      <Header text="Anecdote with most votes" />
    </div>
  )

}

export default App