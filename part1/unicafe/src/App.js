import React, { useState } from 'react'

const Header = (props) => <h1>{props.header}</h1>

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const Statistic = (props) => {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  <Header header="statistics" />

  if(!props.hasFeedback) {
    return <p>No feedback given</p>
  }

  return (
    <div>
      <table>
        <tbody>
          <Statistic name="good" value={props.good} />
          <Statistic name="neutral" value={props.neutral} />
          <Statistic name="bad" value={props.bad} />
          <Statistic name="total" value={props.total} />
          <Statistic name="average" value={props.averagePercent + "%"} />
          <Statistic name="positive" value={props.positivePercent + "%"} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [hasFeedback, setHasFeedback] = useState(false);

  const total = good + neutral + bad;

  const getPercent = (x, totalAmount) => {
    let result = (x / totalAmount) * 100;

    if(isNaN(result)) return 0;

    return result;
  };

  const positivePercent = getPercent(good, total);

  const getAverage = (x, y, totalAmount) => {
    return (x - y)/totalAmount;
  };

  const averagePercent = getAverage(good, bad, total);

  const buttonClick = (type) => {
    setHasFeedback(true);

    if (type === "good") {
      setGood(good + 1);
    } else if (type === "neutral") {
      setNeutral(neutral + 1);
    } else {
      setBad(bad + 1);
    }
  };

  const statisticsObj = {
    hasFeedback: hasFeedback,
    good: good,
    neutral: neutral,
    bad: bad,
    total: total,
    averagePercent: averagePercent,
    positivePercent: positivePercent,
  };

  return (
    <div>
      <Header header="give feedback"/>
      <Button text="good" handleClick={() => buttonClick("good")} />
      <Button text="neutral" handleClick={() => buttonClick("neutral")} />
      <Button text="bad" handleClick={() => buttonClick("negative")} />
      <Statistics {...statisticsObj} />
    </div>
  )
}

export default App
