import {instance, ResultCodeForCapctha, ResultCodesEnum} from "./api";

type MeResponseType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: ResultCodesEnum
    messages: Array<string>
}
type LoginResponseType = {
    resultCode: ResultCodesEnum | ResultCodeForCapctha
    messages: Array<string>
    data: {
        userId: number
    }
}
export const authAPI = {
    me() {
        return instance.get<MeResponseType>('auth/me').then(res => res.data)
    },
    login(email, password, rememberMe, captcha = null) {
        return instance.post<LoginResponseType>('auth/login', {email, password, rememberMe, captcha})
            .then(res => res.data)
    },
    logout() {
        return instance.delete('auth/login')
    },
    getCaptchaUrl() {
        return instance.get('security/get-captcha-url')
    }
}