import {ResultCodesEnum} from '../api/api'
import {BaseThunkType, InferActionsTypes} from './redux-store'
import {PhotosType} from '../types/types'
import {authAPI} from "../api/auth-api";
import {chatAPI, ChatMessageType} from "../api/chat-api";
import {Dispatch} from "redux";



const initialState = {
    messages:[] as ChatMessageType[],
    status: 'pending' as StatusType

}

const chatReducer = (state=initialState, action:ActionsTypes): InitialStateType => {
    const {payload} = action
    switch (action.type) {
        case "SN/chat/MESSAGES_RECEVIED":
            return {
                ...state,messages: [...state.messages, ...action.payload.messages]
            }
        case "SN/chat/STATUS_CHANGED":
            return {
                ...state, status: action.payload.status
            }

        default:
            return state

    }
}
const actions = {
    messagesRecevied : (messages: ChatMessageType[]) => ({
        type:"SN/chat/MESSAGES_RECEVIED",payload: {messages}} as const),
    statusChanged : (status: StatusType) => ({
        type: "SN/chat/STATUS_CHANGED", payload: {status}
    } as const)
}

let _newMessageHandler : ((messages: ChatMessageType[]) => void) | null = null

const newMessageHandlerCreator = (dispatch:Dispatch) =>  {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages:ChatMessageType[]) => {
            dispatch(actions.messagesRecevied(messages))
        }
    }
    return _newMessageHandler
}

export const startMessagesListening = ():ThunkType => async(dispatch) => {
    chatAPI.start()
    chatAPI.subscribe('messages-received', newMessageHandlerCreator(dispatch))
}

export const stopMessagesListening = ():ThunkType => async(dispatch) => {
    chatAPI.unsubscribe('messages-received', newMessageHandlerCreator(dispatch))
}

export const sendMessage = (message:string):ThunkType => async (dispatch) => {
    chatAPI.sendMessage(message)
}


export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>

export default chatReducer;