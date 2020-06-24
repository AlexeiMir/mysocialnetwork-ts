import {usersAPI} from "../api/api";

const SET_USERS = "users/SET_USERS"
const TOGGLE_IS_FETCHING = "users/TOGGLE_IS_FETCHING"
const SET_CURRENT_PAGE = "users/SET_CURRENT_PAGE"
const SET_TOTAL_USERS_COUNT = "users/SET_TOTAL_USERS_COUNT"
const TOGGLE_FOLLOWING_IN_PROGRESS = "users/TOGGLE_FOLLOWING_IN_PROGRESS"
const FOLLOW = "FOLLOW"
const UNFOLLOW = "UNFOLLOW"
const SET_SEARCHED_USER = "SET_SEARCHED_USER"
const SET_USER_PAGE_SIZE = "users/SET_USER_PAGE_SIZE"
const SET_FRIENDS = "users/SET_FRIENDS"


const initialState = {
    users: [],
    friends:[],
    totalUsersCount: 0,
    pageSize: 10,
    currentPage: 5,
    isFetching: false,
    followingInProgress:[],
    optionsForUsers: [
        {title:5, value:5},
        {title:10, value:10},
        {title:15, value:15},
        {title:20, value:20}
    ]

}

const usersReducer = (state = initialState, action) => {
    const {payload} = action
    switch (action.type) {
        case SET_SEARCHED_USER:
        case SET_USERS:
            return {
                ...state, users: payload,

            }
        case SET_FRIENDS:
            return {
                ...state,friends: [...state.friends,...action.users.filter(user => user.followed)]
            }

        case TOGGLE_IS_FETCHING:
            return {
                ...state, isFetching: action.isFetching
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,currentPage:payload
            }
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,totalUsersCount:payload
            }
        case TOGGLE_FOLLOWING_IN_PROGRESS:
            return {
                ...state,
                followingInProgress:
                state.isFetching
                ? [...state.followingInProgress,action.userId]
                :  state.followingInProgress.filter(id => id !== action.userId)
            }
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return {...user, followed: true}
                    }

                    return user
                }),
                friends: [...state.users.map(user => {
                    if (user.id === action.userId) {
                        return {...user, followed: true}
                    }
                    return user
                }).filter(user => user.followed)]
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map( user => {
                    if (user.id === action.userId){
                        return {...user,followed:false}
                    }
                    return user
                }),
                friends: [...state.users.map(user => {
                    if (user.id === action.userId) {
                        return {...user, followed: false}
                    }
                    return user
                }).filter(user => user.followed)]
            }
        case SET_USER_PAGE_SIZE:
            return {
                ...state,
                pageSize:payload
            }

        default:
            return state
    }
}

const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching})
const setFriends = (users) => ({type:SET_FRIENDS,users})
const setUsers = (payload) => ({type: SET_USERS, payload})
const setCurrentPage = (payload) => ({type:SET_CURRENT_PAGE, payload})
const setTotalUsersCount = (payload) => ({type:SET_TOTAL_USERS_COUNT,payload})
const toggleFollowingInProgress = (isFetching,userId) => ({type:TOGGLE_FOLLOWING_IN_PROGRESS,isFetching,userId})
const followSuccess = (userId) => ({type:FOLLOW,userId})
const unFollowSuccess = (userId) => ({type:UNFOLLOW,userId})
const setSearchedUser = (payload) => ({type:SET_SEARCHED_USER,payload})
export const setUserPageSize = (payload) => ({type:SET_USER_PAGE_SIZE,payload})


export const requestUsers = (currentPage, pageSize,searchedUser=null) => async (dispatch) => {
    dispatch(toggleIsFetching(true))
    dispatch(setCurrentPage(currentPage))
    const response = await usersAPI.getUsers(currentPage, pageSize,searchedUser)
    dispatch(setUsers(response.data.items))
    //dispatch(setFriends(response.data.items))
    dispatch(toggleIsFetching(false))
    dispatch(setTotalUsersCount(response.data.totalCount))
}

export const searchUser = (userName) => async(dispatch) => {

const response = await usersAPI.searchUser(userName)
    dispatch(setSearchedUser(response.data.items))



}

const followUnfollowFlow =  async(dispatch,userId,apiMethod,actionCreator) => {
    dispatch(toggleFollowingInProgress(true,userId))
    const response = await apiMethod(userId)
    if (response.data.resultCode === 0){
        dispatch(actionCreator(userId))
        dispatch(toggleFollowingInProgress(false,userId))
    }
}



export const follow = (userId) =>{
    return async(dispatch) =>{
        followUnfollowFlow(dispatch,userId,usersAPI.follow.bind(usersAPI),followSuccess)
    }
}
export const unfollow = (userId) =>{
    return async(dispatch) =>{
        followUnfollowFlow(dispatch,userId,usersAPI.unFollow.bind(usersAPI),unFollowSuccess)
    }
}



export default usersReducer;