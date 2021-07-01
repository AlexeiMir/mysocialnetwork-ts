import {stopSubmit, FormAction} from "redux-form";
import {InferActionsTypes, BaseThunkType} from "./redux-store";
import {ProfileType, PostType, PhotosType} from '../types/types'
import {profileAPI} from "../api/profile-api";


const initialState = {
    profile: null as ProfileType | null,
    status: ' ',
    newPostText :' ',
    posts: [
        {id: 1, post: "It is very good day", likes: 23},
        {id: 2, post: "Yo yo", likes: 5}
    ] as Array<PostType>
}


const profileReducer = (state = initialState, action:ActionsType):InitialState => {
    switch (action.type) {
        case "SN/PROFILE/SET_USER_PROFILE":
            return {
                ...state, profile: action.profile
            }
        case "SN/PROFILE/SET_STATUS":
            return {
                ...state, status: action.status
            }
        case "SN/PROFILE/SET_PHOTO":

            return {
                ...state, profile: {...state.profile, photos: action.photos} as ProfileType
            }

        case "SN/PROFILE/ADD_POST":
            const postId = action.newPostText.toString().length
            let newPost = {id: postId,
                            post:action.newPostText,
                            likes: postId}
            return {
                ...state, posts: [...state.posts,newPost],
                newPostText :""

            }
        case "SN/PROFILE/DELETE_POST":
            return {
                ...state,posts:[...state.posts].filter(post => post.id != action.postId )
            }

        default:
            return state

    }

}

export const actions = {
    setUserProfile : (profile: ProfileType) => ({type: "SN/PROFILE/SET_USER_PROFILE", profile} as const),
    setStatus : (status:string) => ({type: "SN/PROFILE/SET_STATUS", status} as const),
    setPhoto : (photos:PhotosType) => ({type: "SN/PROFILE/SET_PHOTO", photos} as const),
    addPost : (newPostText:string) => ({type: "SN/PROFILE/ADD_POST", newPostText} as const),
    deletePost : (postId:number) => ({type: "SN/PROFILE/DELETE_POST", postId} as const)
}



export const getProfile = (userId:number):ThunkType => async (dispatch) => {
    const data = await profileAPI.getProfile(userId)
    dispatch(actions.setUserProfile(data))

}

export const getStatus = (userId:number):ThunkType => async (dispatch) => {
    const data = await profileAPI.getStatus(userId)
    dispatch(actions.setStatus(data))
}

export const updateStatus = (status:string):ThunkType => async (dispatch) => {
    const data = await profileAPI.updateStatus(status)
    if (data.resultCode === 0) {
        dispatch(actions.setStatus(status))
    }
}

export const updatePhoto = (file:File):ThunkType => async (dispatch) => {
    const data = await profileAPI.updatePhoto(file)
    if (data.resultCode === 0) {
        dispatch(actions.setPhoto(data.data.photos))
    }
}

export const updateProfile = (profile:ProfileType):ThunkType => async (dispatch,getState) => {
    const userId = getState().authPage.userId
    const data = await profileAPI.updateProfile(profile)
    if (data.resultCode === 0) {
        if (userId != null) {
            dispatch(getProfile(userId))
        } else {
            throw new Error("userId can't be null")
        }

    } else { dispatch(stopSubmit('edite-profile',{_error:data.messages[0]}))
        return Promise.reject(data.messages[0])
    }
}

type InitialState = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>



export default profileReducer;