import { NEWS_LIST_REQUEST, NEWS_LIST_SUCCESS, NEWS_LIST_FAIL, } from '../constants/newsConstants'


export const newsListReducer = (state = {news: []}, action) => {
    switch(action.type) {
        case NEWS_LIST_REQUEST:
            return {loading: true, news: []};

        case NEWS_LIST_SUCCESS:
            return {loading: false, news: action.payload}

        case NEWS_LIST_FAIL:
            return {loading: false, error: action.payload}

        default:
            return state
    }
}