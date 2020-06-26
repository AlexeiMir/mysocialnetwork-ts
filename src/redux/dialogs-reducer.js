import {dialogsAPI} from "../api/api";

const TOGGLE_IS_FETCHING = "dialogs/TOGGLE_IS_FETCHING"
const SET_DIALOGS = "dialogs/SET_DIALOGS"
const SET_DIALOG_MESSAGES = "dialogs/SET_DIALOG_MESSAGES"
const SET_ACTIVE_USER_ID = "dialogs/SET_ACTIVE_USER_ID"
const SET_MESSAGE = "dialogs/SET_MESSAGE"
const SET_NEW_MESSAGES_COUNT = "dialogs/SET_NEW_MESSAGES_COUNT"
const SET_MESSAGE_TO_SPAM = "dialogs/SET_MESSAGE_TO_SPAM"
const RESTORE_MESSAGE_SPAM = "dialogs/RESTORE_MESSAGE_SPAM"


const initialState = {
    dialogs: [],
    isFetching: false,
    messages:[],
    activeUserId:'',
    newMessagesCount:'',
    newTextMessage:'',
    spam: []
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
            const newTextMessage = payload
            return {
                ...state, messages:[...state.messages,newTextMessage],
                newTextMessage:''
            }

            case SET_ACTIVE_USER_ID:

            return {
                ...state,activeUserId:payload
            }
        case SET_DIALOG_MESSAGES:
            return {
                ...state,messages:payload
            }
        case SET_NEW_MESSAGES_COUNT:
            return {
                ...state,newMessagesCount:payload
            }
        case SET_MESSAGE_TO_SPAM:
            return {
                ...state,spam:[...state.spam,...state.messages.filter(message =>message.id === payload)]
            }
        case RESTORE_MESSAGE_SPAM:
            return {
                ...state,spam: [...state.spam.filter(m => m.id != payload )]
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
const setNewMessagesCount = (payload) => ({type:SET_NEW_MESSAGES_COUNT,payload})
const setMessageToSpam = (payload) => ({type:SET_MESSAGE_TO_SPAM,payload})
const restoreMessageSpam = (payload) => ({type:RESTORE_MESSAGE_SPAM,payload})



export const getAllDialogs = () => async(dispatch) => {
    dispatch(toggleIsFetchingDialogs(true))
    const response1 = await dialogsAPI.getAllDialogs()
    const response2 = await dialogsAPI.getListNewMessagesCount()
    Promise.all([response1,response2]).then(() => {
        dispatch(setNewMessagesCount(response2.data))
        dispatch(setDialogs(response1.data))
        dispatch(toggleIsFetchingDialogs(false))
    })



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
    dispatch(setDialogMessages(response.data.items))
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

export const deleteMessage = (messageId,userId) => async(dispatch) => {
    const response = await dialogsAPI.deleteMessageForYou(messageId)
    if (response.data.resultCode === 0) {
        dispatch(getListMessages(userId))
    }

}

export const getNewMessagesCount = () => async(dispatch) => {
    const response = await dialogsAPI.getListNewMessagesCount()
    dispatch(setNewMessagesCount(response.data))
}

export const messageToSpamTC = (messageId,userId) => async(dispatch) => {
const response = await dialogsAPI.messageToSpam(messageId)
    if (response.data.resultCode === 0) {
        dispatch(setMessageToSpam(messageId))
        dispatch(getListMessages(userId))
    }

}

export const restoreMessageFromSpam = (messageId,userId) => async(dispatch) => {
    const response = await dialogsAPI.restoreMessage(messageId)
    if (response.data.resultCode === 0) {
        dispatch(restoreMessageSpam(messageId))
        dispatch(getListMessages(userId))
    }

}

export default dialogsReducer;