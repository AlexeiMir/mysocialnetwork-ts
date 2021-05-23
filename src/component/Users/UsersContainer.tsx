import React from "react";
import Users from "./Users";
import {useSelector} from "react-redux";
import Preloader from "../common/Preloader";
import {getIsFetching} from "../../redux/users-selectors";


const UsersContainer = () => {

    const isFetching = useSelector(getIsFetching)

    return <>
        {isFetching ? <Preloader/>: null}
        <Users/>
    </>
}


export default UsersContainer