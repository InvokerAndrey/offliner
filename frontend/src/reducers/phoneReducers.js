import { 
    PHONE_LIST_REQUEST, PHONE_LIST_SUCCESS, PHONE_LIST_FAIL,
    PHONE_DETAILS_REQUEST, PHONE_DETAILS_SUCCESS, PHONE_DETAILS_FAIL,
} from '../constants/phoneConstants'


export const phoneListReducer = (state = {phones: []}, action) => {
    switch(action.type) {
        case PHONE_LIST_REQUEST:
            return {loading: true, phones: []};

        case PHONE_LIST_SUCCESS:
            return {loading: false, phones: action.payload}

        case PHONE_LIST_FAIL:
            return {loading: false, error: action.payload}

        default:
            return state
    }
}


export const phoneDetailsReducer = (state = {phone: {reviews: []}}, action) => {
    switch(action.type) {
        case PHONE_DETAILS_REQUEST:
            return {loading: true, ...state};

        case PHONE_DETAILS_SUCCESS:
            return {loading: false, phone: action.payload}

        case PHONE_DETAILS_FAIL:
            return {loading: false, error: action.payload}

        default:
            return state
    }
}
