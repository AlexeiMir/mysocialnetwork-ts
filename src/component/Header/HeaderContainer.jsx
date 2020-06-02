import React from "react";
import {useDispatch, useSelector} from "react-redux";
import Header from "./Header";
import {logout} from "../../redux/auth-reducer";
import {requestUsers, searchUser} from "../../redux/users-reducer";

const HeaderContainer = () => {
    const isAuth = useSelector(state => state.authPage.isAuth)
    const loginUser = useSelector(state => state.authPage.login)
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logout())
    }

    const handleSearchUser = (userName) => {
        dispatch(searchUser(userName))
    }


    return <>
        <Header isAuth={isAuth} loginUser={loginUser} handleLogout={handleLogout} handleSearchUser={handleSearchUser}/>
    </>
}

export default HeaderContainer;