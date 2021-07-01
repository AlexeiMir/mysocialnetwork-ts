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
    getTotalItemsCount, getUsersFilter,
    getUsersSuperSelector
} from "../../redux/users-selectors";
import {follow, requestUsers, searchUser, actions, unfollow, FilterType} from "../../redux/users-reducer";
import {startChatting} from "../../redux/dialogs-reducer";
import UsersSearchForm from "./UsersSearchForm";
import { useHistory } from "react-router-dom";
import * as queryString from "querystring";


type PropsType = {}

type QueryStringType = { page?: string, term?: string, friend?: string };
const Users: React.FC<PropsType> = (props) => {

    const users = useSelector(getUsersSuperSelector)
    const totalItemsCount = useSelector(getTotalItemsCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const followingInProgress = useSelector(getFollowingInProgress)
    const optionsForUsers = useSelector(getOptionsForUsers)
    const filter = useSelector(getUsersFilter)
    const history = useHistory()
    const dispatch = useDispatch();

    useEffect(() => {
        const parsed = queryString.parse(history.location.search.substr(1)) as QueryStringType
        let actualPage = currentPage
        let actualFilter = filter
        if (!!parsed.page) actualPage = Number(parsed.page)

        if (!!parsed.term) actualFilter = {...actualFilter, term: parsed.term as string}

        switch (parsed.friend) {
            case "null":
                actualFilter = {...actualFilter,friend:null}
                break;
            case "true":
                actualFilter = {...actualFilter,friend:true}
                break;
            case "false":
                actualFilter = {...actualFilter,friend:false}
                break;
            default:
                actualFilter = filter
                break;

        }
        dispatch(requestUsers(actualPage,pageSize,actualFilter))
    },[])

    useEffect(() => {
        const query:QueryStringType = {}
        if (!!filter.term) query.term = String(filter.term)
        if (filter.friend !== null) query.friend = String(filter.friend)
        if (currentPage !==1) query.page = String(currentPage)
        history.push({
            pathname: '/users',
            search: queryString.stringify(query)
        })
    },[currentPage,filter])

    const onPageChanged = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber,pageSize,filter))
    }

    const onFilterChanged = (filter:FilterType) => {
        dispatch(requestUsers(1,pageSize,filter))
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
               {/* <Search handleSearch={handleSearchUser}/>*/}
                <UsersSearchForm  onFilterChanged={onFilterChanged}/>
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