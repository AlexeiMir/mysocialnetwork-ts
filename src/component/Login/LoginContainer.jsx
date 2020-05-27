import React from "react";
import LoginReduxForm from "./Login";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";


const Login = () => {
    const dispatch = useDispatch()
    const isAuth = useSelector(state => state.authPage.isAuth)
    const captchaUrl = useSelector(state => state.authPage.captchaUrl)

    if (isAuth) { return <Redirect to={"/profile"} /> }

    const onSubmit = (formData) => {

        dispatch(login(formData.email, formData.password, formData.rememberMe,formData.captchaUrl))
    }

    return <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
}

export default Login;