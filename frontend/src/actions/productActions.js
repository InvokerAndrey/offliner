import axios from 'axios'
import { 
    PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL,
    PRODUCT_ATTRS_REQUEST, PRODUCT_ATTRS_SUCCESS, PRODUCT_ATTRS_FAIL,
} from '../constants/productConstants'


export const listProducts = (categoryId) => async (dispatch) => {
    try {
        dispatch({type: PRODUCT_LIST_REQUEST})

        const {data} = await axios.get(`/api/shop/products/categories/${categoryId}/`)

        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data,
        })
    } catch(error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.details
                ? error.response.data.details
                    : error.message,
        })
    }
}


export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({type: PRODUCT_DETAILS_REQUEST})

        const {data} = await axios.get(`/api/shop/products/${id}/`)

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data,
        })
    } catch(error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.details
                ? error.response.data.details
                    : error.message,
        })
    }
}


export const listProductAttrs = (id) => async (dispatch) => {
    try {
        dispatch({type: PRODUCT_ATTRS_REQUEST})

        const {data} = await axios.get(`/api/shop/products/${id}/attrs/`)

        dispatch({
            type: PRODUCT_ATTRS_SUCCESS,
            payload: data,
        })
    } catch(error) {
        dispatch({
            type: PRODUCT_ATTRS_FAIL,
            payload: error.response && error.response.data.details
                ? error.response.data.details
                    : error.message,
        })
    }
}