import React, {useEffect} from "react";
import Users from "./Users";
import {useDispatch, useSelector} from "react-redux";
import {follow, requestUsers, searchUser, setUserPageSize, unfollow} from "../../redux/users-reducer";
import Preloader from "../common/Preloader";
import {startChatting} from "../../redux/dialogs-reducer";
import {withRouter} from "react-router-dom";
import {
    getCurrentPage, getFollowingInProgress,
    getIsFetching, getOptionsForUsers,
    getPageSize,
    getTotalItemsCount,
    getUsersSuperSelector
} from "../../redux/users-selectors";


const UsersContainer = () => {
    const users = useSelector(state => getUsersSuperSelector(state))
    const totalItemsCount = useSelector(state => getTotalItemsCount(state))
    const currentPage = useSelector(state => getCurrentPage(state))
    const pageSize = useSelector(state => getPageSize(state))
    const isFetching = useSelector(state => getIsFetching(state))
    const followingInProgress = useSelector(state => getFollowingInProgress(state))
    const optionsForUsers = useSelector(state => getOptionsForUsers(state))
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(requestUsers(currentPage,pageSize))
    },[pageSize])

    const onPageChanged = (pageNumber) => {
        dispatch(requestUsers(pageNumber,pageSize))
    }

    const handleFollow = (userId) => {dispatch(follow(userId))}
    const handleUnfollow = (userId) => {dispatch(unfollow(userId))}
    const handleStartChatting = (userId) => {dispatch(startChatting(userId))}
    const handlePageUserSize = (value) => {dispatch(setUserPageSize(value))}
    const handleSearchUser = (nameUser) => {dispatch(searchUser(nameUser))}



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
               optionsForUsers={optionsForUsers}
               handlePageUserSize={handlePageUserSize}
               handleSearchUser={handleSearchUser}

        />
    </>
}




export default UsersContainer