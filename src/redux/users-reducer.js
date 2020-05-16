import {usersAPI} from "../api/api";

const SET_USERS = "users/SET_USERS"
const TOGGLE_IS_FETCHING = "users/TOGGLE_IS_FETCHING"
const SET_CURRENT_PAGE = "users/SET_CURRENT_PAGE"
const SET_TOTAL_USERS_COUNT = "users/SET_TOTAL_USERS_COUNT"
const TOGGLE_FOLLOWING_IN_PROGRESS = "users/TOGGLE_FOLLOWING_IN_PROGRESS"
const FOLLOW = "FOLLOW"
const UNFOLLOW = "UNFOLLOW"

const initialState = {
    users: [],
    totalUsersCount: 0,
    pageSize: 10,
    currentPage: 5,
    isFetching: false,
    followingInProgress:[]
}

const usersReducer = (state = initialState, action) => {
    const {payload} = action
    switch (action.type) {
        case SET_USERS:
            return {
                ...state, users: payload
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
                users: state.users.map( user => {
                    if (user.id === action.userId){
                       return {...user,followed:true}
                    }
                    return user
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map( user => {
                    if (user.id === action.userId){
                        return {...user,followed:false}
                    }
                    return user
                })
            }

        default:
            return state
    }
}

const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching})
const setUsers = (payload) => ({type: SET_USERS, payload})
const setCurrentPage = (payload) => ({type:SET_CURRENT_PAGE, payload})
const setTotalUsersCount = (payload) => ({type:SET_TOTAL_USERS_COUNT,payload})
const toggleFollowingInProgress = (isFetching,userId) => ({type:TOGGLE_FOLLOWING_IN_PROGRESS,isFetching,userId})
const followSuccess = (userId) => ({type:FOLLOW,userId})
const unFollowSuccess = (userId) => ({type:UNFOLLOW,userId})

export const requestUsers = (currentPage, pageSize) => async (dispatch) => {
    dispatch(toggleIsFetching(true))
    dispatch(setCurrentPage(currentPage))
    const response = await usersAPI.getUsers(currentPage, pageSize)
    dispatch(setUsers(response.data.items))
    dispatch(toggleIsFetching(false))
    dispatch(setTotalUsersCount(response.data.totalCount))
}

const followUnfollowFlow =  async(dispatch,userId,apiMethod,actionCreator) => {
    dispatch(toggleFollowingInProgress(true,userId))
    const response = await apiMethod(userId)
    if (response.resultCode === 0){
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