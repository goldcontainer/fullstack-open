import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Weather from './components/Weather'

// button needs an id attribute and value for the eventHandler to set the search as the country's name
const Country = (props) => {
  return(
    <li>
      {props.name} <button onClick={props.handleClick} id={props.name}>show</button>
    </li>
  )
}

const CountryMatch = (props) => {
  return (
    <div>
      <h1>{props.country.name}</h1>
      <p>capital {props.country.capital}</p>
      <p>population {props.country.population}</p>
      <h2>languages</h2>
      <ul>
        {props.country.languages.map(language =>
          <li>{language.name}</li>
        )}
      </ul>
      <img src={props.country.flag} alt='flag'/>

      <h2>Weather in {props.country.capital}</h2>
      <Weather query={props.country.capital} />
    </div>
  )
}

const CountryList = (props) => {
  if(props.list.length > 10 && props.isFiltering) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  } else if(!props.isFiltering) {
    return (
      <div>   
      </div>
    )
  } else if (props.list.length === 1) {
    return(
      <CountryMatch country={props.list[0]} />
    )
  } else {
    return(
      <ul>
        {props.list.map(country =>
          <Country key={country.id} name={country.name} handleClick={props.handleClick}/>
        )}
      </ul>
    )
  }
}

const App = () => {
  const [ countries, setCountries ] = useState([]);
  const [ search, setSearch ] = useState('');
  const [ isFiltering, setFilter ] = useState(false);

  const searchList = countries.filter(country => country.name.toLowerCase().includes(search.toLowerCase()));

  const handleSearchChange = (event) => {
    // console.log(event.target.value)
    setSearch(event.target.value)
    if(event.target.value === '') {
      setFilter(false);
    } else {
      setFilter(true);
    }
  }

  const handleClick = (event) => {
    // console.log(event.target.id);
    setSearch(event.target.id);
    setFilter(true);
  }

  useEffect(() => {
    // console.log('effect');
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data);
        console.log(response.data);
      })
  }, [])

  // console.log('render', countries.length, 'countries');

  return (
    <div>
      <div>find countries <input value={search} onChange={handleSearchChange}/></div>
      <CountryList list={searchList} isFiltering={isFiltering} handleClick={(event) => handleClick(event)}/>
    </div>
  )
}

export default App;
