import axios from 'axios'

import { CATEGORY_LIST_REQUEST, CATEGORY_LIST_SUCCESS, CATEGORY_LIST_FAIL } from '../constants/categoryConstants'


export const listCategories = () => async (dispatch) =>{
    try {
        dispatch({ type: CATEGORY_LIST_REQUEST })

        const {data} = await axios.get('/api/shop/products/categories/')

        dispatch({ 
            type: CATEGORY_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({ 
            type: CATEGORY_LIST_FAIL,
            payload: error.response && error.response.data.details
                ? error.response.data.details
                    : error.message

        })
    }
}