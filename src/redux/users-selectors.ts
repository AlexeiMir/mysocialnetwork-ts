import {createSelector} from "reselect"
import {AppStateType} from "./redux-store";

const getUsersSelector = (state:AppStateType) => {
    return state.usersPage.users
}

export const getUsersSuperSelector = createSelector(getUsersSelector,(users) => {
    return users.filter(u => true)
})

export const getTotalItemsCount = (state:AppStateType) => {
    return state.usersPage.totalUsersCount
}

export const getPageSize = (state:AppStateType) => {
    return state.usersPage.pageSize
}

export const getCurrentPage = (state:AppStateType) => {
    return state.usersPage.currentPage
}

export const getIsFetching = (state:AppStateType) => {
    return state.usersPage.isFetching
}

export const getFollowingInProgress = (state:AppStateType) => {
    return state.usersPage.followingInProgress
}

export const getFriends = (state:AppStateType) => {
    return state.usersPage.friends
}
export const getOptionsForUsers = (state:AppStateType) => {
    return state.usersPage.optionsForUsers
}

export const getUsersFilter = (state:AppStateType) => {
    return state.usersPage.filter
}