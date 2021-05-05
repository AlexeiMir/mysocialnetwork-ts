import {stopSubmit} from "redux-form";
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
                ...state, profile: {...state.profile, photos: action.photos}
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

const actions = {
    setUserProfile : (profile: ProfileType) => ({type: "SN/PROFILE/SET_USER_PROFILE", profile} as const),
    setStatus : (status:string) => ({type: "SN/PROFILE/SET_STATUS", status} as const),
    setPhoto : (photos:PhotosType) => ({type: "SN/PROFILE/SET_PHOTO", photos} as const),
    addPost : (newPostText:string) => ({type: "SN/PROFILE/ADD_POST", newPostText} as const),
    deletePost : (postId:number) => ({type: "SN/PROFILE/DELETE_POST", postId} as const)
}



export const getProfile = (userId:number):ThunkType => async (dispatch) => {
    const response = await profileAPI.getProfile(userId)
    dispatch(actions.setUserProfile(response.data))

}

export const getStatus = (userId:number):ThunkType => async (dispatch) => {
    const response = await profileAPI.getStatus(userId)
    dispatch(actions.setStatus(response.data))
}

export const updateStatus = (status:string):ThunkType => async (dispatch) => {
    const response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(actions.setStatus(status))
    }
}

export const updatePhoto = (file:File):ThunkType => async (dispatch) => {
    const response = await profileAPI.updatePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(actions.setPhoto(response.data.data.photos))
    }
}

export const updateProfile = (profile:ProfileType):ThunkType => async (dispatch,getState) => {
    const userId = getState().authPage.userId
    const response = await profileAPI.updateProfile(profile)
    if (response.data.resultCode === 0) {
        dispatch(getProfile(userId))
    } else { dispatch(stopSubmit('edite-profile',{_error:response.data.messages[0]}))
        return Promise.reject(response.data.messages[0])
    }
}

type InitialState = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>



export default profileReducer;