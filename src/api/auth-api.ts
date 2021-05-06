import {instance, ResultCodeForCapctha, ResultCodesEnum, APIResponseType} from "./api";

type MeResponseType = {
        id: number
        email: string
        login: string
}
type LoginResponseType = {
        userId: number
}
export const authAPI = {
    me() {
        return instance.get<APIResponseType<MeResponseType>>('auth/me').then(res => res.data)
    },
    login(email, password, rememberMe, captcha = null) {
        return instance.post<APIResponseType<LoginResponseType, ResultCodesEnum | ResultCodeForCapctha>>('auth/login', {email, password, rememberMe, captcha})
            .then(res => res.data)
    },
    logout() {
        return instance.delete('auth/login')
    },
    getCaptchaUrl() {
        return instance.get('security/get-captcha-url')
    }
}