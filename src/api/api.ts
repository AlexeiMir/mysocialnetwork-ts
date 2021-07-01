import axios from 'axios'
import {DialogType, MessageTypeInMessage, UserType} from '../types/types'

export const instance = axios.create({
    withCredentials:true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {'API-KEY': '8a32d348-6f9e-451a-b238-e010eb3eea31'}

})

export enum ResultCodesEnum {
    Success=0,
    Error=1
}

export enum ResultCodeForCapctha {
    CaptchaIsRequired = 10
}

export type APIResponseType<D={},RC=ResultCodesEnum> = {
    data: D,
    messages: Array<string>,
    resultCode: RC
}

export type GetItemsType<T> = {
    items: Array<T>,
    totalCount: number,
    error: string | null
}

export type GetAllDialogsType = Array<DialogType>

export type SendMessageType<RC=ResultCodesEnum> = {
    data: MessageTypeInMessage
    messages:Array<MessageTypeInMessage>
    fieldsErrors:Array<string>
    resultCode:RC
}
