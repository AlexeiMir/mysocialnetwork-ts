import {APIResponseType} from "../api/api";
import {UserType} from '../types/types'
import {Dispatch} from "redux";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {usersAPI} from "../api/users-api";


const initialState = {
    users: [] as Array<UserType>,
    friends:[] as Array<UserType>,
    totalUsersCount: 0,
    pageSize: 10,
    currentPage: 5,
    isFetching: false,
    followingInProgress:[] as Array<number>,
    optionsForUsers: [
        {title:5, value:5},
        {title:10, value:10},
        {title:15, value:15},
        {title:20, value:20}
    ]

}

const usersReducer = (state = initialState, action:ActionsTypes):InitialState => {
    switch (action.type) {
        case "SN/SET_SEARCHED_USER":
        case "SN/USERS/SET_USERS":
            return {
                ...state, users: action.users,

            }

        case "SN/USERS/TOGGLE_IS_FETCHING":
            return {
                ...state, isFetching: action.isFetching
            }
        case "SN/USERS/SET_CURRENT_PAGE":
            return {
                ...state,currentPage:action.currentPage
            }
        case "SN/USERS/SET_TOTAL_USERS_COUNT":
            return {
                ...state,totalUsersCount:action.totalUsersCount
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
                pageSize:action.payload
            }

        default:
            return state
    }
}
//actions
export const actions = {
    toggleIsFetching : (isFetching:boolean) => ({type: "SN/USERS/TOGGLE_IS_FETCHING", isFetching} as const),
    setUsers : (users: Array<UserType>) => ({type: "SN/USERS/SET_USERS", users} as const),
    setCurrentPage : (currentPage: number) => ({type:"SN/USERS/SET_CURRENT_PAGE", currentPage} as const),
    setTotalUsersCount : (totalUsersCount: number) => ({type:"SN/USERS/SET_TOTAL_USERS_COUNT",totalUsersCount} as const),
    toggleFollowingInProgress : (isFetching: boolean, userId: number) => ({type:"SN/USERS/TOGGLE_FOLLOWING_IN_PROGRESS",isFetching,userId} as const),
    followSuccess : (userId: number) => ({type:"SN/USERS/FOLLOW",userId} as const),
    unFollowSuccess : (userId: number) => ({type:"SN/USERS/UNFOLLOW",userId} as const),
    setSearchedUser : (users: Array<UserType>) => ({type:"SN/SET_SEARCHED_USER",users} as const),
    setUserPageSize : (payload:any) => ({type:"SN/USERS/SET_USER_PAGE_SIZE",payload} as const)
}


export const requestUsers = (currentPage:number, pageSize:number):ThunkType =>
    async (dispatch:Dispatch<ActionsTypes>) => {
    dispatch(actions.toggleIsFetching(true))
    dispatch(actions.setCurrentPage(currentPage))
    const data = await usersAPI.getUsers(currentPage, pageSize)
    dispatch(actions.setUsers(data.items))
    //dispatch(setFriends(response.data.items))
    dispatch(actions.toggleIsFetching(false))
    dispatch(actions.setTotalUsersCount(data.totalCount))
}

export const searchUser = (userName:string):ThunkType => async(dispatch:Dispatch<ActionsTypes>) => {

const data = await usersAPI.searchUser(userName)
    dispatch(actions.setSearchedUser(data.items))

}

const _followUnfollowFlow =  async(dispatch:Dispatch<ActionsTypes>,
                                   userId:number,
                                   apiMethod: (userId:number) => Promise<APIResponseType>,
                                   actionCreator: (userId:number) => ActionsTypes
) => {
    dispatch(actions.toggleFollowingInProgress(true,userId))
    let data = await apiMethod(userId)
    if (data.resultCode == 0){
        dispatch(actionCreator(userId))
        dispatch(actions.toggleFollowingInProgress(false,userId))
    }
}



export const follow = (userId:number):ThunkType =>{
    return async(dispatch) =>{
        _followUnfollowFlow(dispatch,userId,usersAPI.follow.bind(usersAPI),actions.followSuccess)
    }
}
export const unfollow = (userId:number):ThunkType =>{
    return async(dispatch) =>{
        _followUnfollowFlow(dispatch,userId,usersAPI.unFollow.bind(usersAPI),actions.unFollowSuccess)
    }
}

type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>
type InitialState = typeof initialState

export default usersReducer;