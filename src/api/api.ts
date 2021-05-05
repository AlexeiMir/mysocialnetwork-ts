import axios from 'axios'
import {UserType} from '../types/types'

export const instance = axios.create({
    withCredentials:true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {'API-KEY': '210a4391-39dd-4e0e-8d9d-4503ceec2ef8'}
    //210a4391-39dd-4e0e-8d9d-4503ceec2ef8    second account
        //8a32d348-6f9e-451a-b238-e010eb3eea31   first account
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

export type GetItemsType = {
    items: Array<UserType>,
    totalCount: number,
    error: string | null
}
