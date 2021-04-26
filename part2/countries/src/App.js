import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Country = (props) => {
  return(
    <li>{props.name}</li>
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
    </div>
  )
}

const CountryList = (props) => {
  if(props.list.length > 10 && props.isFiltering) {
    return (<p>Too many matches, specify another filter</p>)
  } else if(!props.isFiltering) {
    return (<div></div>)
  } else if (props.list.length === 1) {
    return(<CountryMatch country={props.list[0]} />)
  } else {
    return(
      <ul>
        {props.list.map(country =>
          <Country key={country.id} name={country.name} />
        )}
      </ul>
    )
  }
}

const App = () => {
  const [ countries, setCountries ] = useState([]);
  const [ search, setSearch ] = useState('');
  const [ isFiltering, setFilter ] = useState(false);

  const searchList = countries.filter(country => country.name.toLowerCase().startsWith(search.toLowerCase()));

  const handleSearchChange = (event) => {
    console.log(event.target.value)
    setSearch(event.target.value)
    if(event.target.value === '') {
      setFilter(false);
    } else {
      setFilter(true);
    }
  }

  useEffect(() => {
    console.log('effect');
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        // console.log('promise fulfilled');
        // console.log(response.data);
        setCountries(response.data);
        console.log(response.data);
      })
  }, [])

  // console.log('render', countries.length, 'countries');

  return (
    <div>
      <div>find countries <input value={search} onChange={handleSearchChange}/></div>
      <CountryList list={searchList} isFiltering={isFiltering}/>
    </div>
  )
}

export default App;
