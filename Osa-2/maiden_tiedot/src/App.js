import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      Find countries: <input value = {filter} onChange = {handleFilterChange}/>
    </div>
  )
}

const ListCountries = ({ countriesToShow, handleClick }) => {
  return (
    countriesToShow.map(country => <CountryRow key={country.name} country = {country} handleClick = {handleClick} />)
  )
}

const CountryRow = ({ country, handleClick }) => {
  const clickHandler = (country) => {
    return () => handleClick(country)
  }
  return (
    <div>
      {country.name} <button onClick={clickHandler(country)}>Show</button>
    </div>

  )
}

const CountryInformation = ({ country }) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h2>Languages</h2>
      <ul>
        {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img src={country.flag} alt='Flag of the country' width="25%" height ="25%"/>
    </div>
  )
}

const WeatherInformation = ({ country }) => {
  const [weather, setWeather] = useState({request: {}, location: {}, current: {temperature: null, wind_speed: null, wind_dir: null, weather_icons: [null]}})

  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY

    axios
      .get('http://api.weatherstack.com/current', {
        params: {
          access_key: api_key,
          query: country.capital
        }
      })
      .then(response => {
        setWeather(response.data)
      })
  },[])

  return (
    <div>
      <h2>Weather in {country.capital}</h2>
      <div><strong>Temperature:</strong> {weather.current.temperature} Celsius</div>
      <img src={weather.current.weather_icons[0]} alt='Weather forecast'/>
      <div><strong>Wind:</strong> {weather.current.wind_speed}, direction {weather.current.wind_dir} </div>
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  },[])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleClick = (event) => {
    setFilter(event.name)
  }

  const countriesToShow = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))

  if (countriesToShow.length > 10) {
    return (
      <div>
        <Filter filter = {filter} handleFilterChange = {handleFilterChange}/>
        <p>Too many matches, specify another filter.</p>
      </div>
    )
  } else if (countriesToShow.length === 1) {
    return (
      <div>
        <Filter filter = {filter} handleFilterChange = {handleFilterChange}/>
        <CountryInformation country = {countriesToShow[0]}/>
        <WeatherInformation country = {countriesToShow[0]}/>
      </div>
    )
  } else {
    return (
      <div>
        <Filter filter = {filter} handleFilterChange = {handleFilterChange}/>
        <ListCountries countriesToShow = {countriesToShow} handleClick = {handleClick} />
      </div>
    )
  }

}

export default App