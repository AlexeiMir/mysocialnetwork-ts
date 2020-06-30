import {newsAPI} from "../api/api";

const TOGGLE_IS_LOADING = "news/TOGGLE_IS_LOADING"
const SET_NEWS_DATA = "news/SET_NEWS_DATA"
const SET_TOTAL_RESULTS = "news/SET_TOTAL_RESULTS"
const SET_PAGE_SIZE = "news/SET_PAGE_SIZE"
const SET_PAGE_NEWS_NUMBER = "news/SET_PAGE_NEWS_NUMBER"
const SET_MESSAGE_ERROR = "news/SET_MESSAGE_ERROR"

const initialState = {
    totalResults: null,
    articles: [],
    isLoading: false,
    pageSize: 5,
    currentPage: 1,
    messageError:null,
    optionsForNews: [
        {title:5, value:5},
        {title:10, value:10},
        {title:15, value:15},
        {title:20, value:20}
    ]
}


const newsReducer = (state = initialState, action) => {
    const {payload} = action;
    switch (action.type) {
        case TOGGLE_IS_LOADING:
            return {
                ...state, isLoading: action.isLoading
            }
        case SET_NEWS_DATA:
            return {
                ...state, articles: payload
            }
        case SET_TOTAL_RESULTS:
            return {
                ...state,totalResults:payload
            }
        case SET_PAGE_SIZE:
            return {
                ...state,pageSize:payload
            }
        case SET_PAGE_NEWS_NUMBER:
            return {
                ...state,currentPage:payload
            }
        case SET_MESSAGE_ERROR:
            return {
                ...state, messageError:payload
            }

        default:
            return state

    }
}

const toggleIsLoading = (isLoading) => ({type: TOGGLE_IS_LOADING, isLoading})
const setNewsData = (payload) => ({type: SET_NEWS_DATA, payload})
const setTotalResults = (payload) => ({type: SET_TOTAL_RESULTS, payload})
export const setPageSize = (payload) => ({type:SET_PAGE_SIZE,payload})
export const setPageNewsNumber = (payload) => ({type:SET_PAGE_NEWS_NUMBER,payload})
const setMessageError = (payload) => ({type:SET_MESSAGE_ERROR,payload})


export const getNews = (pageSize, page) => async (dispatch) => {
    try {
        dispatch(toggleIsLoading(true))
        const response = await newsAPI.getNews(pageSize, page)

        dispatch(setNewsData(response.data.hits))

        dispatch(setTotalResults(response.data.nbHits))
        dispatch(setMessageError(null))
        dispatch(toggleIsLoading(false))
    } catch(error) {
        debugger
        dispatch(setMessageError(error.response.data.message))
    }
}

export const searchNews = (pageSize,searchValue) => async(dispatch) => {
try {
    const response = await newsAPI.searchNews(pageSize,searchValue)
    dispatch(setNewsData(response.hits))
    dispatch(setMessageError(null))
} catch (error) {
    dispatch(setMessageError(error.response.data.message))
}
}

export default newsReducer