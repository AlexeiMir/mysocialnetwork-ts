import {dialogsAPI} from "../api/api";

const TOGGLE_IS_FETCHING = "dialogs/TOGGLE_IS_FETCHING"
const SET_DIALOGS = "dialogs/SET_DIALOGS"
const SET_DIALOG_MESSAGES = "dialogs/SET_DIALOG_MESSAGES"
const SET_ACTIVE_DIALOG_ID = "dialogs/SET_ACTIVE_DIALOG_ID"


const initialState = {
    dialogs: [],
    isFetching: false,
    messages:[],
    activeDialogId:''
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
                ...state,dialogs:[...state.dialogs,...payload]
            }

            case SET_ACTIVE_DIALOG_ID:

            return {
                ...state,activeDialogId:payload
            }

        default:
            return state
    }

}

const toggleIsFetchingDialogs = (isFetching) => ({type:TOGGLE_IS_FETCHING,isFetching})
const setDialogs = (payload) => ({type:SET_DIALOGS,payload})
const setDialogMessages = (payload) => ({type:SET_DIALOG_MESSAGES,payload})
const setActiveDialogId = (payload) => ({type:SET_ACTIVE_DIALOG_ID,payload})



export const getAllDialogs = () => async(dispatch) => {
    dispatch(toggleIsFetchingDialogs(true))
    const response = await dialogsAPI.getAllDialogs()
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

export const getListMessages = (dialogId) => async(dispatch) => {
    dispatch(toggleIsFetchingDialogs(true))
    dispatch(setActiveDialogId(dialogId))
    const response = await dialogsAPI.getListsMessages(dialogId)
    dispatch(setDialogMessages(response.data))
    dispatch(toggleIsFetchingDialogs(false))
}

export const sendMessage = (message) => async(dispatch,getState) => {
    const userId = getState().dialogsPage.activeDialogId
    dispatch(toggleIsFetchingDialogs(true))
    const response = await dialogsAPI.sendMessageToFriend(message,userId)

    dispatch(toggleIsFetchingDialogs(false))

}

export default dialogsReducer;