import { WEATHER_DISPLAY_REQUEST, WEATHER_DISPLAY_SUCCESS, WEATHER_DISPLAY_FAIL } from '../constants/weatherConstants'


export const weatherDisplayReducer = (state = {weather: {}}, action) => {
    switch(action.type) {
        case WEATHER_DISPLAY_REQUEST:
            return {loading: true, ...state};

        case WEATHER_DISPLAY_SUCCESS:
            return {loading: false, weather: action.payload}

        case WEATHER_DISPLAY_FAIL:
            return {loading: false, error: action.payload}

        default:
            return state
    }
}