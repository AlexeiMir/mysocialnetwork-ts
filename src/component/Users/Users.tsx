import React, {useEffect} from "react";
import User from "./User";
import Paginator from "../../utils/Paginator/Paginator";
import Grid from "@material-ui/core/Grid";
import Search from "../../utils/Search/Search";
import Selector from "../../utils/Selector/Selector";
import s from "./users.module.css"
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getOptionsForUsers,
    getPageSize,
    getTotalItemsCount,
    getUsersSuperSelector
} from "../../redux/users-selectors";
import {follow, requestUsers, searchUser, actions, unfollow} from "../../redux/users-reducer";
import {startChatting} from "../../redux/dialogs-reducer";

type PropsType = {}

const Users: React.FC<PropsType> = (props) => {

    const users = useSelector(getUsersSuperSelector)
    const totalItemsCount = useSelector(getTotalItemsCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const followingInProgress = useSelector(getFollowingInProgress)
    const optionsForUsers = useSelector(getOptionsForUsers)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(requestUsers(currentPage,pageSize))
    },[pageSize])

    const onPageChanged = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber,pageSize))
    }

    const handleFollow = (userId: number) => {dispatch(follow(userId))}
    const handleUnfollow = (userId: number) => {dispatch(unfollow(userId))}
    const handleStartChatting = (userId: number) => {dispatch(startChatting(userId))}
    const handlePageUserSize = (value: number) => {dispatch(actions.setUserPageSize(value))}
    const handleSearchUser = (nameUser:string) => {dispatch(searchUser(nameUser))}

    return <>
        <Paginator totalItemsCount={totalItemsCount} pageSize={pageSize} currentPage={currentPage}
                   onPageChanged={onPageChanged}/>

        <Grid container spacing={3} className={s.searchBlock} justify="center" alignItems="flex-end">
            <Grid item xs={3}>
                <Search handleSearch={handleSearchUser}/>
            </Grid>
            <Grid item xs={3}>
                <Selector options={optionsForUsers} value={pageSize} handlePageSize={handlePageUserSize}/>
            </Grid>
        </Grid>
        <Grid container spacing={3} justify="center" alignItems="flex-end">
            {users.map(user => <Grid item xs={4} key={user.id}> <User  user={user} handleFollow={handleFollow}
                                                        handleUnfollow={handleUnfollow}
                                                        followingInProgress={followingInProgress}
                                                        handleStartChatting={handleStartChatting}

                />
                </Grid>
            )}
        </Grid>
    </>
}

export default Users;