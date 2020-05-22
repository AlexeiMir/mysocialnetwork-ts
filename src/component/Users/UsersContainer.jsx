import React, {useEffect} from "react";
import Users from "./Users";
import {useDispatch, useSelector} from "react-redux";
import {follow, requestUsers, unfollow} from "../../redux/users-reducer";
import Preloader from "../common/Preloader";
import {startChatting} from "../../redux/dialogs-reducer";
import {withRouter} from "react-router-dom";


const UsersContainer = () => {
    const users = useSelector(state => state.usersPage.users)
    const totalItemsCount = useSelector(state => state.usersPage.totalUsersCount)
    const currentPage = useSelector(state => state.usersPage.currentPage)
    const pageSize = useSelector(state => state.usersPage.pageSize)
    const isFetching = useSelector(state => state.usersPage.isFetching)
    const followingInProgress = useSelector(state => state.usersPage.followingInProgress)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(requestUsers(currentPage,pageSize))
    },[])

    const onPageChanged = (pageNumber) => {
        dispatch(requestUsers(pageNumber,pageSize))
    }

    const handleFollow = (userId) => {dispatch(follow(userId))}
    const handleUnfollow = (userId) => {dispatch(unfollow(userId))}
    const handleStartChatting = (userId) => {dispatch(startChatting(userId))}



    return <>
        {isFetching ? <Preloader/>: null}
        <Users users={users}
               totalItemsCount={totalItemsCount}
               pageSize={pageSize}
               currentPage={currentPage}
               onPageChanged={onPageChanged}
               handleFollow={handleFollow}
               handleUnfollow={handleUnfollow}
               followingInProgress={followingInProgress}
               handleStartChatting={handleStartChatting}
        />
    </>
}




export default UsersContainer