import React, {useEffect} from 'react'
import { usePosition } from 'use-position'
import { useDispatch, useSelector } from 'react-redux'

import { displayWeather } from '../actions/weatherActions'
import Loader from './Loader.js'
import Message from './Message.js'


function Weather() {
    const dispatch = useDispatch()

    const weatherDisplay = useSelector(state => state.weatherDisplay)
    const {loading: loadingWeather, error: errorWeather, weather} = weatherDisplay

    console.log('Weather:', weather)

    const {latitude, longitude, error} = usePosition()

    console.log('lat: ', latitude)
    console.log('long: ', longitude)

    useEffect(() => {
        if (latitude && longitude && !error) {
            dispatch(displayWeather(latitude, longitude))
          }
    }, [latitude, longitude, error, dispatch])
    
    return (
        <div>
            {loadingWeather && <Loader />}
            {errorWeather && <Message variant="danger">{errorWeather}</Message>}
            <i className="fas fa-cloud-sun-rain"></i>
            {weather.city}, {weather.country} <br />
            {weather.temperature}&deg;C, {weather.description}
        </div>
    )
}

export default Weather
