import React from 'react'


const CurrentWeather = (props) => {

	return(
		<div>
			<p>temperature: {props.condition.current.temperature} Celsius</p>
			<img src={props.condition.current.weather_icons} alt={props.condition.current.weather_descriptions} />
			<p>wind: {props.condition.current.wind_speed} mph direction {props.condition.current.wind_dir} </p>
		</div>
	)

}


export default CurrentWeather;