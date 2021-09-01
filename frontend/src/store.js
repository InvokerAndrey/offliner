import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { cartReducer } from './reducers/cartReducers'

import { 
    phoneListReducer,
    phoneDetailsReducer,
    phoneFilterValuesReducer,
    phoneFilterListReducer,
    phoneDeleteReducer,
    phoneCreateReducer,
    phoneUpdateReducer,
    phoneReviewCreateReducer,
    phoneTopRatedReducer,
} from './reducers/phoneReducers'

import {
    userLoginReducer,
    userRegisterReducer, 
    userDetailsReducer, 
    userUpdateProfileReducer,
    userListReducer,
    userDeleteReducer,
    userUpdateReducer,
} from './reducers/userReducers'

import {
    orderCreateReducer,
    orderDetailsReducer,
    orderPayReducer,
    orderListMyReducer,
    orderListReducer,
    orderDeliverReducer,
} from './reducers/orderReducers'

import { 
    newsListReducer,
} from './reducers/newsReducers'

import { weatherDisplayReducer } from './reducers/weatherReducers'


const reducer = combineReducers({
    phoneList: phoneListReducer,
    phoneDetails: phoneDetailsReducer,
    phoneFilterValues: phoneFilterValuesReducer,
    phoneFilterList: phoneFilterListReducer,
    phoneDelete: phoneDeleteReducer,
    phoneCreate: phoneCreateReducer,
    phoneUpdate: phoneUpdateReducer,
    phoneReviewCreate: phoneReviewCreateReducer,
    phoneTopRated: phoneTopRatedReducer,

    cart: cartReducer,

    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,

    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer,
    orderList: orderListReducer,
    orderDeliver: orderDeliverReducer,

    newsList: newsListReducer,

    weatherDisplay: weatherDisplayReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ?
    JSON.parse(localStorage.getItem('shippingAddress')) : {}

const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage,
    },
    userLogin: {userInfo: userInfoFromStorage}
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store