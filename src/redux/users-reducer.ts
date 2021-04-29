import {usersAPI, APIResponseType} from "../api/api";
import {UserType} from '../types/types'
import {Action, Dispatch} from "redux";
import {AppStateType, InferActionsTypes, BaseThunkType} from "./redux-store";


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

const usersReducer = (state = initialState, action:ActionsTypes):InitialState => {
    const {payload} = action
    switch (action.type) {
        case "SN/SET_SEARCHED_USER":
        case "SN/USERS/SET_USERS":
            return {
                ...state, users: payload,

            }

        case "SN/USERS/TOGGLE_IS_FETCHING":
            return {
                ...state, isFetching: action.isFetching
            }
        case "SN/USERS/SET_CURRENT_PAGE":
            return {
                ...state,currentPage:payload
            }
        case "SN/USERS/SET_TOTAL_USERS_COUNT":
            return {
                ...state,totalUsersCount:payload
            }
        case "SN/USERS/TOGGLE_FOLLOWING_IN_PROGRESS":
            return {
                ...state,
                followingInProgress:
                state.isFetching
                ? [...state.followingInProgress,action.userId]
                :  state.followingInProgress.filter(id => id !== action.userId)
            }
        case "SN/USERS/FOLLOW":
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
        case "SN/USERS/UNFOLLOW":
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
        case "SN/USERS/SET_USER_PAGE_SIZE":
            return {
                ...state,
                pageSize:payload
            }

        default:
            return state
    }
}

const actions = {
    toggleIsFetching : (isFetching:boolean) => ({type: "SN/USERS/TOGGLE_IS_FETCHING", isFetching} as const),
    setUsers : (users: Array<UserType>) => ({type: "SN/USERS/SET_USERS", users} as const),
    setCurrentPage : (currentPage: number) => ({type:"SN/USERS/SET_CURRENT_PAGE", currentPage} as const),
    setTotalUsersCount : (totalUsersCount: number) => ({type:"SN/USERS/SET_TOTAL_USERS_COUNT",totalUsersCount} as const),
    toggleFollowingInProgress : (isFetching: boolean, userId: number) => ({type:"SN/USERS/TOGGLE_FOLLOWING_IN_PROGRESS",isFetching,userId} as const),
    followSuccess : (userId) => ({type:"SN/USERS/FOLLOW",userId} as const),
    unFollowSuccess : (userId) => ({type:"SN/USERS/UNFOLLOW",userId} as const),
    setSearchedUser : (payload) => ({type:"SN/SET_SEARCHED_USER",payload} as const),
    setUserPageSize : (payload) => ({type:"SN/USERS/SET_USER_PAGE_SIZE",payload} as const)
}


export const requestUsers = (currentPage, pageSize,searchedUser=null):ThunkType =>
    async (dispatch:Dispatch<ActionsTypes>) => {
    dispatch(actions.toggleIsFetching(true))
    dispatch(actions.setCurrentPage(currentPage))
    const response = await usersAPI.getUsers(currentPage, pageSize,searchedUser)
    dispatch(actions.setUsers(response.data.items))
    //dispatch(setFriends(response.data.items))
    dispatch(actions.toggleIsFetching(false))
    dispatch(actions.setTotalUsersCount(response.data.totalCount))
}

export const searchUser = (userName):ThunkType => async(dispatch:Dispatch<ActionsTypes>) => {

const response = await usersAPI.searchUser(userName)
    dispatch(actions.setSearchedUser(response.data.items))

}

const _followUnfollowFlow =  async(dispatch:Dispatch<ActionsTypes>,
                                   userId:number,
                                   apiMethod: (userId:number) => Promise<APIResponseType>,
                                   actionCreator: (userId:number) => ActionsTypes
) => {
    dispatch(actions.toggleFollowingInProgress(true,userId))
    let response = await apiMethod(userId)
    if (response.resultCode == 0){
        dispatch(actionCreator(userId))
        dispatch(actions.toggleFollowingInProgress(false,userId))
    }
}



export const follow = (userId):ThunkType =>{
    return async(dispatch) =>{
        _followUnfollowFlow(dispatch,userId,usersAPI.follow.bind(usersAPI),actions.followSuccess)
    }
}
export const unfollow = (userId):ThunkType =>{
    return async(dispatch) =>{
        _followUnfollowFlow(dispatch,userId,usersAPI.unFollow.bind(usersAPI),actions.unFollowSuccess)
    }
}

type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>
type InitialState = typeof initialState

export default usersReducer;