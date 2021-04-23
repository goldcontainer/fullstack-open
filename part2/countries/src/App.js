import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Country = (props) => {
  return(
    <li>{props.name}</li>
  )
}

const CountryList = (props) => {
  return(
    <ul>
      {props.list.map(country =>
        <Country key={country.id} name={country.name} />
        )}
    </ul>
  )
}

const App = () => {
  const [ countries, setCountries ] = useState([]);
  const [ search, setSearch ] = useState('');

  const handleSearchChange = (event) => {
    console.log(event.target.value)
    setSearch(event.target.value)
  }

  useEffect(() => {
    console.log('effect');
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled');
        setCountries(response.data);
      })
  })

  const searchList = countries.filter(country => {country.name.toLowerCase().startsWith(search.toLowerCase())});

  return (
    <div>
      <div>find countries <input value={search} onChange={handleSearchChange}/></div>
      <CountryList list={countries} />
    </div>
  )
}

export default App;
