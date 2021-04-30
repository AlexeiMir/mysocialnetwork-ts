import {authAPI, profileAPI} from "../api/api";
import {ResultCodeForCapctha, ResultCodesEnum} from '../api/api'
import {InferActionsTypes, BaseThunkType} from './redux-store'


const initialState = {
    isAuth:false,
    email:null as string |null,
    password:null as string |null,
    userId:null as number |null,
    login:null as string |null,
    captchaUrl:null as string |null,
    myPhoto:null as string |null

}

const authReducer = (state=initialState, action:ActionsTypes): InitialStateType => {
    const {payload} = action
    switch (action.type) {
        case "SN/auth/SET_AUTH_USER_DATA":
        case "SN/auth/SET_CAPTCHA_URL":
        case  "SN/auth/SET_MY_PHOTO":
            return{
                ...state,...payload
            }

        default:
            return state

    }
}
const actions = {
    setAuthUserData : (userId: number,email: string,login: string,isAuth: boolean) => ({type:"SN/auth/SET_AUTH_USER_DATA",payload:{userId,email,login,isAuth}} as const),
    setCaptchaUrl : (captchaUrl) => ({type:"SN/auth/SET_CAPTCHA_URL",payload:{captchaUrl}} as const),
    setMyPhoto : (myPhoto) => ({type:"SN/auth/SET_MY_PHOTO",payload:{myPhoto}})
}


export const getAuthUserData = ():ThunkType => async(dispatch) => {
    const meData = await authAPI.me()
    if (meData.resultCode === ResultCodesEnum.Success){
        const {id,email,login} = meData.data
       dispatch(actions.setAuthUserData(id,email,login,true))
    }

}

export const getMyPhoto = (userId):ThunkType => async(dispatch) => {
    const response = await profileAPI.getProfile(userId)
    dispatch(actions.setMyPhoto(response.data.photos))
}

export const login = (email: string,password: string,rememberMe: boolean, captcha: string):ThunkType => async(dispatch) =>{
const data = await authAPI.login(email,password,rememberMe,captcha)
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(getAuthUserData())
    } else if (data.resultCode === ResultCodeForCapctha.CaptchaIsRequired) {
        dispatch(getCaptchaUrl())
    }
}

const getCaptchaUrl = ():ThunkType => async(dispatch) => {
    const response = await authAPI.getCaptchaUrl()
    dispatch(actions.setCaptchaUrl(response.data.url))
    
}

export const logout = ():ThunkType => async(dispatch) => {
    const response = await authAPI.logout()
    if (response.data.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.setAuthUserData(null,null,null,false))}
}

export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>

export default authReducer;