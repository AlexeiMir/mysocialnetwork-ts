import {dialogsAPI} from "../api/api";

const TOGGLE_IS_FETCHING = "dialogs/TOGGLE_IS_FETCHING"
const SET_DIALOGS = "dialogs/SET_DIALOGS"

const initialState = {
    dialogs: [
        {id: 1, name:'Dimych'},
        {id: 2, name:'Alex'}
    ],
    isFetching: false
}


const dialogsReducer = (state=initialState,action) => {
    const {payload} = action
    switch (action.type) {
        case TOGGLE_IS_FETCHING:
            return {
                ...state,isFetching:action.isFetching
            }
        case SET_DIALOGS:
            return {
                ...state,dialogs:payload
            }

        default:
            return state
    }

}

const toggleIsFetchingDialogs = (isFetching) => ({type:TOGGLE_IS_FETCHING,isFetching})
const setDialogs = (payload) => ({type:SET_DIALOGS,payload})


export const getAllDialogs = () => async(dispatch) => {
    dispatch(toggleIsFetchingDialogs(true))
    const response =  dialogsAPI.getAllDialogs()
    dispatch(setDialogs(response.data))
    dispatch(toggleIsFetchingDialogs(false))

}
//[{"id":7988,"userName":"Yaroslav1321","hasNewMessages":false,"lastDialogActivityDate":"2020-05-13T10:33:58.72","lastUserActivityDate":"2020-05-12T21:51:05.523",
export const startChatting = (userId) => {
    return async(dispatch) => {
        dispatch(toggleIsFetchingDialogs(true))
const response = await dialogsAPI.startChatting(userId)
        if (response.resultCode === 0) {
            dispatch(getAllDialogs())
        }
        dispatch(toggleIsFetchingDialogs(false))

    }
}

export default dialogsReducer;