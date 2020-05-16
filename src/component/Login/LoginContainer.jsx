import React from "react";
import LoginReduxForm from "./Login";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";


const Login = () => {
    const dispatch = useDispatch()
    const isAuth = useSelector(state => state.authPage.isAuth)

    if (isAuth) { return <Redirect to={"/users"} /> }

    const onSubmit = (formData) => {

        dispatch(login(formData.email, formData.password, formData.rememberMe))
    }

    return <LoginReduxForm onSubmit={onSubmit}/>
}

export default Login;