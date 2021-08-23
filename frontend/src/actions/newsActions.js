import axios from 'axios'
import { 
    NEWS_LIST_REQUEST,
    NEWS_LIST_SUCCESS,
    NEWS_LIST_FAIL
 } from '../constants/newsConstants'


 export const listNews = (category) => async (dispatch) => {
    try {
        dispatch({type: NEWS_LIST_REQUEST})

        const {data} = await axios.get(`/api/news/${category}/`)

        dispatch({
            type: NEWS_LIST_SUCCESS,
            payload: data,
        })
    } catch(error) {
        dispatch({
            type: NEWS_LIST_FAIL,
            payload: error.response && error.response.data.details
                ? error.response.data.details
                    : error.message,
        })
    }
}