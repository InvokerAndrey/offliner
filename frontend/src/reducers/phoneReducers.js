import { 
    PHONE_LIST_REQUEST, PHONE_LIST_SUCCESS, PHONE_LIST_FAIL,
    PHONE_DETAILS_REQUEST, PHONE_DETAILS_SUCCESS, PHONE_DETAILS_FAIL,
    PHONE_FILTER_VALUES_REQUEST, PHONE_FILTER_VALUES_SUCCESS, PHONE_FILTER_VALUES_FAIL,
    PHONE_FILTER_LIST_REQUEST, PHONE_FILTER_LIST_SUCCESS, PHONE_FILTER_LIST_FAIL,
    PHONE_DELETE_REQUEST, PHONE_DELETE_SUCCESS, PHONE_DELETE_FAIL,
    PHONE_CREATE_REQUEST, PHONE_CREATE_SUCCESS, PHONE_CREATE_FAIL, PHONE_CREATE_RESET,
    PHONE_UPDATE_REQUEST, PHONE_UPDATE_SUCCESS, PHONE_UPDATE_FAIL, PHONE_UPDATE_RESET,
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


export const phoneFilterValuesReducer = (state = {
    filterValues: {
        category: [],
        year: [],
        brand: [],
        operatingSystem: [],
        screenSize: [],
        screenResolution: [],
        screenTechnology: [],
        platform: [],
        RAM: [],
        flashMemory: [],
        camera: [],
        cameraAmount: [],
        battery: [],
    }
}, action) => {
    switch(action.type) {
        case PHONE_FILTER_VALUES_REQUEST:
            return {
                loading: true,
                filterValues: {
                    category: [],
                    year: [],
                    brand: [],
                    operatingSystem: [],
                    screenSize: [],
                    screenResolution: [],
                    screenTechnology: [],
                    platform: [],
                    RAM: [],
                    flashMemory: [],
                    camera: [],
                    cameraAmount: [],
                    battery: [],
                }
            };

        case PHONE_FILTER_VALUES_SUCCESS:
            return {loading: false, filterValues: action.payload}

        case PHONE_FILTER_VALUES_FAIL:
            return {loading: false, error: action.payload}

        default:
            return state
    }
}


export const phoneFilterListReducer = (state = {phones: []}, action) => {
    switch(action.type) {
        case PHONE_FILTER_LIST_REQUEST:
            return {loading: true, phones: []};

        case PHONE_FILTER_LIST_SUCCESS:
            return {loading: false, phones: action.payload}

        case PHONE_FILTER_LIST_FAIL:
            return {loading: false, error: action.payload}

        default:
            return state
    }
}


export const phoneDeleteReducer = (state = {}, action) => {
    switch(action.type) {
        case PHONE_DELETE_REQUEST:
            return {loading: true};

        case PHONE_DELETE_SUCCESS:
            return {loading: false, success: true}

        case PHONE_DELETE_FAIL:
            return {loading: false, error: action.payload}

        default:
            return state
    }
}


export const phoneCreateReducer = (state = {}, action) => {
    switch(action.type) {
        case PHONE_CREATE_REQUEST:
            return {loading: true};

        case PHONE_CREATE_SUCCESS:
            return {loading: false, success: true, phone: action.payload}

        case PHONE_CREATE_FAIL:
            return {loading: false, error: action.payload}

        case PHONE_CREATE_RESET:
            return {}
        
        default:
            return state
    }
}


export const phoneUpdateReducer = (state = {phone: {}}, action) => {
    switch(action.type) {
        case PHONE_UPDATE_REQUEST:
            return {loading: true};

        case PHONE_UPDATE_SUCCESS:
            return {loading: false, success: true, phone: action.payload}

        case PHONE_UPDATE_FAIL:
            return {loading: false, error: action.payload}

        case PHONE_UPDATE_RESET:
            return {phone: {}}
        
        default:
            return state
    }
}