import {authAPI} from "../api/api";

const SET_AUTH_USER_DATA = "SET_AUTH_USER_DATA"
const SET_CAPTCHA_URL = "SET_CAPTCHA_URL"


const initialState = {
    isAuth:false,
    email:null,
    password:null,
    userId:null,
    login:null,
    captchaUrl:null

}

const authReducer = (state=initialState,action) => {
    const {payload} = action
    switch (action.type) {
        case SET_AUTH_USER_DATA:
        
            return{
                ...state,...payload
            }
            case SET_CAPTCHA_URL:
               
                return{
                    ...state,captchaUrl:payload
                }
        default:
            return state

    }
}

const setAuthUserData = (userId,email,login,isAuth) => ({type:SET_AUTH_USER_DATA,payload:{userId,email,login,isAuth}})
const setCaptchaUrl = (payload) => ({type:SET_CAPTCHA_URL,payload})

export const getAuthUserData = () => async(dispatch) => {
    const response = await authAPI.me()
    if (response.data.resultCode === 0){
        const {id,email,login} = response.data.data
       dispatch( setAuthUserData(id,email,login,true))
    }

}

export const login = (email,password,rememberMe,captcha) => async(dispatch) =>{
const response = await authAPI.login(email,password,rememberMe,captcha)
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData())
    } else if (response.data.resultCode === 10) {
        dispatch(getCaptchaUrl())
    }
}

const getCaptchaUrl = () => async(dispatch) => {
    const response = await authAPI.getCaptchaUrl()
    dispatch(setCaptchaUrl(response.data.url))
    
}

export const logout = () => async(dispatch) => {
    const response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null,null,null,false))}
}


export default authReducer;