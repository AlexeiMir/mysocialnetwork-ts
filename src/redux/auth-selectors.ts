import { AppStateType } from "./redux-store"

export const selectIsAuth = (state:AppStateType) => {
    return state.authPage.isAuth
}
export const selectCaptchaUrl = (state:AppStateType) => {
    return state.authPage.captchaUrl
}

export const selectCurrentUserLogin = (state:AppStateType) => {
    return state.authPage.login
}

export const selectMyPhoto = (state:AppStateType) => {
    return state.authPage.myPhoto
}

export const getAutorizaionedUserId = (state:AppStateType) => state.authPage.userId