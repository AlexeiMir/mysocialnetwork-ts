import {BaseThunkType, InferActionsTypes} from './redux-store'
import {DialogType, MessageType} from '../types/types'
import {Dispatch} from "redux";
import {dialogsAPI} from "../api/dialogs-api";


const initialState = {
    dialogs: [] as Array<DialogType>,
    isFetching: false,
    messages:[] as Array<MessageType>,
    activeUserId:'',
    newMessagesCount:'',
    newMessage:null as MessageType,
    spam: []
}


const dialogsReducer = (state=initialState,action:ActionsTypes):InitialStateType => {
    switch (action.type) {
        case "SN/DIALOGS/TOGGLE_IS_FETCHING":
            return {
                ...state,isFetching:action.isFetching
            }
        case "SN/DIALOGS/SET_DIALOGS":
            return {
                ...state,dialogs:[...action.dialogs]
            }
        case "SN/DIALOGS/SET_MESSAGE" :
            const newMessage = action.newMessage
            return {
                ...state, messages:[...state.messages,newMessage],
                newMessage:null
            }

            case "SN/DIALOGS/SET_ACTIVE_USER_ID":

            return {
                ...state,activeUserId:action.activeUserId
            }
        case "SN/DIALOGS/SET_DIALOG_MESSAGES":
            return {
                ...state,messages:action.messages
            }
        case "SN/DIALOGS/SET_NEW_MESSAGES_COUNT":
            return {
                ...state,newMessagesCount:action.newMessagesCount
            }
        case "SN/DIALOGS/SET_MESSAGE_TO_SPAM":
            return {
                ...state,spam:[...state.spam,...state.messages.filter(message =>message.id === payload)]
            }
        case "SN/DIALOGS/RESTORE_MESSAGE_SPAM":
            return {
                ...state,spam: [...state.spam.filter(m => m.id !== action.messageId )]
            }

        default:
            return state
    }

}

const actions = {
    toggleIsFetchingDialogs : (isFetching) => ({type:"SN/DIALOGS/TOGGLE_IS_FETCHING",isFetching} as const),
    setDialogs : (dialogs:Array<DialogType>) => ({type:"SN/DIALOGS/SET_DIALOGS",dialogs} as const),
    setDialogMessages : (messages:Array<MessageType>) => ({type:"SN/DIALOGS/SET_DIALOG_MESSAGES",messages} as const),
    setActiveUserId : (activeUserId:string) => ({type:"SN/DIALOGS/SET_ACTIVE_USER_ID",activeUserId} as const),
    setMessage : (newMessage:MessageType) => ({type:"SN/DIALOGS/SET_MESSAGE",newMessage} as const),
    setNewMessagesCount : (newMessagesCount:string) => ({type:"SN/DIALOGS/SET_NEW_MESSAGES_COUNT",newMessagesCount} as const),
    setMessageToSpam : (messageId:number) => ({type:"SN/DIALOGS/SET_MESSAGE_TO_SPAM",messageId} as const),
    restoreMessageSpam : (messageId) => ({type:"SN/DIALOGS/RESTORE_MESSAGE_SPAM",messageId} as const)
}


export const getAllDialogs = ():ThunkType => async(dispatch:Dispatch<ActionsTypes>) => {
    dispatch(actions.toggleIsFetchingDialogs(true))
    const data1 = await dialogsAPI.getAllDialogs()
    const data2 = await dialogsAPI.getListNewMessagesCount()
    Promise.all([data1,data2]).then(() => {
        dispatch(actions.setNewMessagesCount(data2))
        dispatch(actions.setDialogs(data1))
        dispatch(actions.toggleIsFetchingDialogs(false))
    })



}
//[{"id":7988,"userName":"Yaroslav1321","hasNewMessages":false,"lastDialogActivityDate":"2020-05-13T10:33:58.72","lastUserActivityDate":"2020-05-12T21:51:05.523",
export const startChatting = (userId):ThunkType => {
    return async(dispatch) => {
        dispatch(actions.toggleIsFetchingDialogs(true))
const data = await dialogsAPI.startChatting(userId)
        if (data.resultCode == 0) {
            dispatch(getAllDialogs())
            dispatch(actions.setActiveUserId(userId))
        }
        dispatch(actions.toggleIsFetchingDialogs(false))

    }
}

export const getListMessages = (userId):ThunkType => async(dispatch:Dispatch<ActionsTypes>) => {
    dispatch(actions.toggleIsFetchingDialogs(true))
    const data = await dialogsAPI.getListsMessages(userId)
    dispatch(actions.setDialogMessages(data.items))
    dispatch(actions.toggleIsFetchingDialogs(false))


}

export const sendMessage = (message,userId):ThunkType => async(dispatch:Dispatch<ActionsTypes>) => {
    
    dispatch(actions.toggleIsFetchingDialogs(true))
    const data = await dialogsAPI.sendMessageToFriend(message,userId)
    if (data.resultCode === 0) {

        dispatch(actions.setMessage(data.data.message))
    }
    dispatch(actions.toggleIsFetchingDialogs(false))

}

export const deleteMessage = (messageId,userId):ThunkType => async(dispatch) => {
    const response = await dialogsAPI.deleteMessageForYou(messageId)
    if (response.data.resultCode === 0) {
        dispatch(getListMessages(userId))
    }

}

export const getNewMessagesCount = ():ThunkType => async(dispatch:Dispatch<ActionsTypes>) => {
    const response = await dialogsAPI.getListNewMessagesCount()
    dispatch(actions.setNewMessagesCount(response.data))
}

export const messageToSpamTC = (messageId,userId):ThunkType => async(dispatch) => {
const response = await dialogsAPI.messageToSpam(messageId)
    if (response.data.resultCode === 0) {
        dispatch(actions.setMessageToSpam(messageId))
        dispatch(getListMessages(userId))
    }

}

export const restoreMessageFromSpam = (messageId,userId):ThunkType =>
    async(dispatch) => {
    const response = await dialogsAPI.restoreMessage(messageId)
    if (response.data.resultCode === 0) {
        dispatch(actions.restoreMessageSpam(messageId))
        dispatch(getListMessages(userId))
    }

}
type ActionsTypes = InferActionsTypes<typeof actions>
type InitialStateType = typeof initialState
type ThunkType = BaseThunkType<ActionsTypes>

export default dialogsReducer;