import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CurrentWeather from './CurrentWeather'

const Weather = ({ query }) => {
	const [ condition, setCondition ] = useState({});
	const [ hasStatus, setHasStatus ] = useState(false);

	
	const key = process.env.REACT_APP_API_KEY;

	useEffect(() => {
	    axios
	      .get('http://api.weatherstack.com/current', {
	      	params: {
	      		access_key: key,
	      		query: query
	      	}
	      })
	      .then(response => {
	      	if(response.status === 200) {
	      		setCondition(response.data);
	      		setHasStatus(true);
	      	}
	      })
	  }, [])

	return (
		<div>
			{hasStatus && <CurrentWeather condition={condition} />}
		</div>
	)

}

export default Weather;