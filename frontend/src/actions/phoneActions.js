import axios from 'axios'
import { 
    PHONE_LIST_REQUEST, PHONE_LIST_SUCCESS, PHONE_LIST_FAIL,
    PHONE_DETAILS_REQUEST, PHONE_DETAILS_SUCCESS, PHONE_DETAILS_FAIL,
} from '../constants/phoneConstants'


export const listPhones = () => async (dispatch) => {
    try {
        dispatch({type: PHONE_LIST_REQUEST})

        const {data} = await axios.get(`/api/shop/phones/`)

        dispatch({
            type: PHONE_LIST_SUCCESS,
            payload: data,
        })
    } catch(error) {
        dispatch({
            type: PHONE_LIST_FAIL,
            payload: error.response && error.response.data.details
                ? error.response.data.details
                    : error.message,
        })
    }
}


export const listPhoneDetails = (id) => async (dispatch) => {
    try {
        dispatch({type: PHONE_DETAILS_REQUEST})

        const {data} = await axios.get(`/api/shop/phones/${id}/`)

        dispatch({
            type: PHONE_DETAILS_SUCCESS,
            payload: data,
        })
    } catch(error) {
        dispatch({
            type: PHONE_DETAILS_FAIL,
            payload: error.response && error.response.data.details
                ? error.response.data.details
                    : error.message,
        })
    }
}
