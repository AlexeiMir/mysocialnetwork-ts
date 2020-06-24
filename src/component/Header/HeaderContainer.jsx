import React from "react";
import {useDispatch, useSelector} from "react-redux";
import Header from "./Header";
import {logout} from "../../redux/auth-reducer";


const HeaderContainer = (props) => {
    const isAuth = useSelector(state => state.authPage.isAuth)
    const loginUser = useSelector(state => state.authPage.login)
    const myPhoto = useSelector(state => state.authPage.myPhoto)
    const newMessagesCount = useSelector(state => state.dialogsPage.newMessagesCount)
    const dispatch = useDispatch()



    const handleLogout = () => {
        dispatch(logout())
    }




    return <>
        <Header isAuth={isAuth} loginUser={loginUser} handleLogout={handleLogout} newMessagesCount={newMessagesCount}
                myPhoto={myPhoto}/>
    </>
}

export default HeaderContainer;