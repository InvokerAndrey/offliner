import axios from 'axios'
import { WEATHER_DISPLAY_REQUEST, WEATHER_DISPLAY_SUCCESS, WEATHER_DISPLAY_FAIL } from '../constants/weatherConstants'


export const displayWeather = (latitude, longitude) => async (dispatch) => {
    try {
        dispatch({type: WEATHER_DISPLAY_REQUEST})

        const {data} = await axios.get(`/api/weather/?latitude=${latitude}&longitude=${longitude}`)

        dispatch({
            type: WEATHER_DISPLAY_SUCCESS,
            payload: data,
        })
    } catch(error) {
        dispatch({
            type: WEATHER_DISPLAY_FAIL,
            payload: error.response && error.response.data.details
                ? error.response.data.details
                    : error.message,
        })
    }
}
