import axios from 'axios'
import { 
    PHONE_LIST_REQUEST, PHONE_LIST_SUCCESS, PHONE_LIST_FAIL,
    PHONE_DETAILS_REQUEST, PHONE_DETAILS_SUCCESS, PHONE_DETAILS_FAIL,
    PHONE_FILTER_VALUES_REQUEST, PHONE_FILTER_VALUES_SUCCESS, PHONE_FILTER_VALUES_FAIL,
    PHONE_FILTER_LIST_REQUEST, PHONE_FILTER_LIST_SUCCESS, PHONE_FILTER_LIST_FAIL,
    PHONE_DELETE_REQUEST, PHONE_DELETE_SUCCESS, PHONE_DELETE_FAIL,
    PHONE_CREATE_REQUEST, PHONE_CREATE_SUCCESS, PHONE_CREATE_FAIL,
    PHONE_UPDATE_REQUEST, PHONE_UPDATE_SUCCESS, PHONE_UPDATE_FAIL,
    PHONE_CREATE_REVIEW_REQUEST, PHONE_CREATE_REVIEW_SUCCESS, PHONE_CREATE_REVIEW_FAIL,
} from '../constants/phoneConstants'


export const listPhones = (keyword = '') => async (dispatch) => {
    try {
        dispatch({type: PHONE_LIST_REQUEST})
        console.log('keyword:', keyword)
        // keyword looks like this (?keyword=SEARCHTEXT)
        const {data} = await axios.get(`/api/shop/phones${keyword}`)

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


export const deletePhone = (id) => async (dispatch, getState) => {
    try {
        dispatch({type: PHONE_DELETE_REQUEST})

        const {
            userLogin: {userInfo}
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.delete(
            `/api/shop/phones/delete/${id}/`,
            config
        )
   
        dispatch({
            type: PHONE_DELETE_SUCCESS,
        })
    } catch(error) {
        dispatch({
            type: PHONE_DELETE_FAIL,
            payload: error.response && error.response.data.details
                ? error.response.data.details
                    : error.message,
        })
    }
}


export const createPhone = () => async (dispatch, getState) => {
    try {
        dispatch({type: PHONE_CREATE_REQUEST})

        const {
            userLogin: {userInfo}
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.post(
            `/api/shop/phones/create/`,
            {},
            config
        )
   
        dispatch({
            type: PHONE_CREATE_SUCCESS,
            payload: data,
        })
    } catch(error) {
        dispatch({
            type: PHONE_CREATE_FAIL,
            payload: error.response && error.response.data.details
                ? error.response.data.details
                    : error.message,
        })
    }
}


export const updatePhone = (phone) => async (dispatch, getState) => {
    try {
        dispatch({type: PHONE_UPDATE_REQUEST})

        const {
            userLogin: {userInfo}
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.put(
            `/api/shop/phones/update/${phone.id}/`,
            phone,
            config
        )
   
        dispatch({
            type: PHONE_UPDATE_SUCCESS,
            payload: data,
        })

        dispatch({
            type: PHONE_DETAILS_SUCCESS,
            payload: data,
        })
    } catch(error) {
        dispatch({
            type: PHONE_UPDATE_FAIL,
            payload: error.response && error.response.data.details
                ? error.response.data.details
                    : error.message,
        })
    }
}


export const createReview = (phoneId, review) => async (dispatch, getState) => {
    try {
        dispatch({type: PHONE_CREATE_REVIEW_REQUEST})

        const {
            userLogin: {userInfo}
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.post(
            `/api/shop/phones/${phoneId}/reviews/`,
            review,
            config
        )
   
        dispatch({
            type: PHONE_CREATE_REVIEW_SUCCESS,
        })
    } catch(error) {
        dispatch({
            type: PHONE_CREATE_REVIEW_FAIL,
            payload: error.response && error.response.data.details
                ? error.response.data.details
                    : error.message,
        })
    }
}


export const listFilterValues = () => async (dispatch) => {
    try {
        dispatch({type: PHONE_FILTER_VALUES_REQUEST})

        const {data} = await axios.get(`/api/shop/phones/filter-values/`)

        console.log('DATA: ', data)

        dispatch({
            type: PHONE_FILTER_VALUES_SUCCESS,
            payload: data,
        })
    } catch(error) {
        dispatch({
            type: PHONE_FILTER_VALUES_FAIL,
            payload: error.response && error.response.data.details
                ? error.response.data.details
                    : error.message,
        })
    }
}


export const searchByFilter = (
        minPrice, maxPrice, category, year, brand, operatingSystem, screenSize, screenResolution,
        screenTechnology, platform, RAM, flashMemory, camera, cameraAmount, battery,
    ) => async (dispatch) => {
    try {
        if (Number(minPrice) > Number(maxPrice) || Number(minPrice) < 0 || Number(maxPrice) < 0) {
            dispatch({
                type: PHONE_FILTER_LIST_FAIL,
                payload: 'Invalid price filter values'
            })
        }

        dispatch({type: PHONE_FILTER_LIST_REQUEST})

        const config = {
            headers: {
                'Content-type': 'application/json',
            }
        }

        const {data} = await axios.put(
            `/api/shop/phones/filter-results/`,
            {
                'minPrice': minPrice,
                'maxPrice': maxPrice,
                'category': category,
                'year': year,
                'brand': brand,
                'operatingSystem': operatingSystem,
                'screenSize': screenSize,
                'screenResolution': screenResolution,
                'screenTechnology': screenTechnology,
                'platform': platform,
                'RAM': RAM,
                'flashMemory': flashMemory,
                'camera': camera,
                'cameraAmount': cameraAmount,
                'battery': battery
            },
            config
        )
        
        console.log('SearchDATA: ', data)
        dispatch({
            type: PHONE_FILTER_LIST_SUCCESS,
            payload: data,
        })

        dispatch({
            type: PHONE_LIST_SUCCESS,
            payload: data,
        })

    } catch(error) {
        dispatch({
            type: PHONE_FILTER_LIST_FAIL,
            payload: error.response && error.response.data.details
                ? error.response.data.details
                    : error.message,
        })
    }
}
