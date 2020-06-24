import React, {useEffect, useState} from "react";
import Navbar from "./Navbar";
import {useDispatch, useSelector} from "react-redux";
import {getFriends, getUsersSuperSelector} from "../../redux/users-selectors";


const NavbarContainer = () => {

    const friends = useSelector(state =>getFriends(state))
    const isAuth = useSelector(state => state.authPage.isAuth)



  /*  useEffect(() => {
        setFriends(friends)
    },[users])*/

    return(
        <Navbar friends={friends} isAuth={isAuth}/>
    )
}

export default NavbarContainer;