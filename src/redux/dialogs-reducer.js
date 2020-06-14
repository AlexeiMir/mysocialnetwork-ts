import {dialogsAPI} from "../api/api";

const TOGGLE_IS_FETCHING = "dialogs/TOGGLE_IS_FETCHING"
const SET_DIALOGS = "dialogs/SET_DIALOGS"
const SET_DIALOG_MESSAGES = "dialogs/SET_DIALOG_MESSAGES"
const SET_ACTIVE_USER_ID = "dialogs/SET_ACTIVE_USER_ID"
const SET_MESSAGE = "dialogs/SET_MESSAGE"


const initialState = {
    dialogs: [],
    isFetching: false,
    messages:[],
    activeUserId:''
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
                ...state,dialogs:[...payload]
            }
        case SET_MESSAGE :

            return {
                ...state, messages:[...state.messages,payload]
            }

            case SET_ACTIVE_USER_ID:

            return {
                ...state,activeUserId:payload
            }

        default:
            return state
    }

}

const toggleIsFetchingDialogs = (isFetching) => ({type:TOGGLE_IS_FETCHING,isFetching})
const setDialogs = (payload) => ({type:SET_DIALOGS,payload})
const setDialogMessages = (payload) => ({type:SET_DIALOG_MESSAGES,payload})
const setActiveUserId = (payload) => ({type:SET_ACTIVE_USER_ID,payload})
const setMessage = (payload) => ({type:SET_MESSAGE,payload})



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
            dispatch(setActiveUserId(userId))
        }
        dispatch(toggleIsFetchingDialogs(false))

    }
}

export const getListMessages = (userId) => async(dispatch) => {
    dispatch(toggleIsFetchingDialogs(true))
    const response = await dialogsAPI.getListsMessages(userId)
    dispatch(setDialogMessages(response.data))
    dispatch(toggleIsFetchingDialogs(false))
}
//{"data":{"message":{"id":"fddcc178-8c84-468d-915b-4cec742750da","body":"мввпвпвп","translatedBody":null,
// "addedAt":"2020-06-13T06:20:59.083","senderId":5572,"senderName":"AlexeiMir","recipientId":8386,"recipientName":"Vlada",
// "viewed":false,"deletedBySender":false,"deletedByRecipient":false,"isSpam":false,"distributionId":null}},"messages":[],
// "resultCode":0}
export const sendMessage = (message,userId) => async(dispatch) => {
    
    dispatch(toggleIsFetchingDialogs(true))
    const response = await dialogsAPI.sendMessageToFriend(message,userId)
    if (response.data.resultCode === 0) {

        dispatch(setMessage(response.data.data.message))
    }
    dispatch(toggleIsFetchingDialogs(false))

}

export default dialogsReducer;