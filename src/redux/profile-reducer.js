import {profileAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_PROFILE = "SET_USER_PROFILE"
const SET_STATUS = "SET_STATUS"
const SET_PHOTO = "SET_PHOTO"
const ADD_POST = "ADD_POST"
const DELETE_POST = "DELETE_POST"


const initialState = {
    profile: null,
    status: "some",
    newPostText :"",
    posts: [
        {id: 1, post: "It is very good day", likes: 23},
        {id: 2, post: "Yo yo", likes: 5}
    ]
}


const profileReducer = (state = initialState, action) => {
    const {payload} = action
    switch (action.type) {
        case SET_USER_PROFILE:
            return {
                ...state, profile: payload
            }
        case SET_STATUS:
            return {
                ...state, status: payload
            }
        case SET_PHOTO:

            return {
                ...state, profile: {...state.profile, photos: payload}
            }

        case ADD_POST:
            const postId = payload.toString().length
            let newPostText = payload
            return {
                ...state, posts: [...state.posts,{id: postId,post:newPostText,likes: postId}],
                newPostText :""

            }
        case DELETE_POST:
            return {
                ...state,posts:[...state.posts].filter(post => post.id != payload )
            }

        default:
            return state

    }

}

const setUserProfile = (payload) => ({type: SET_USER_PROFILE, payload})
const setStatus = (payload) => ({type: SET_STATUS, payload})
const setPhoto = (payload) => ({type: SET_PHOTO, payload})
export const addPost = (payload) => ({type: ADD_POST, payload})
export const deletePost = (payload) => ({type: DELETE_POST, payload})


export const getProfile = (userId) => async (dispatch) => {
    const response = await profileAPI.getProfile(userId)
    dispatch(setUserProfile(response.data))

}

export const getStatus = (userId) => async (dispatch) => {
    const response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data))
}

export const updateStatus = (status) => async (dispatch) => {
    const response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status))
    }
}

export const updatePhoto = (photo) => async (dispatch) => {
    const response = await profileAPI.updatePhoto(photo)
    if (response.data.resultCode === 0) {
        dispatch(setPhoto(response.data.data.photos))
    }
}

export const updateProfile = (profile) => async (dispatch,getState) => {
    const userId = getState().authPage.userId
    const response = await profileAPI.updateProfile(profile)
    if (response.data.resultCode === 0) {
        dispatch(getProfile(userId))
    } else { dispatch(stopSubmit('edite-profile',{_error:response.data.messages[0]}))
        return Promise.reject(response.data.messages[0])
    }
}

export default profileReducer;