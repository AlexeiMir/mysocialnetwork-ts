
export const selectIsAuth = (state) => {
    return state.authPage.isAuth
}
export const selectCaptchaUrl = (state) => {
    return state.authPage.captchaUrl
}

export const selectCurrentUserLogin = (state) => {
    return state.authPage.login
}

export const selectMyPhoto = (state) => {
    return state.authPage.myPhoto
}