import {profileAPI} from "../api/api";

const SET_USER_PROFILE = "SET_USER_PROFILE"
const SET_STATUS = "SET_STATUS"
const SET_PHOTO = "SET_PHOTO"


const initialState = {
    profile:null,
    status:"some",
    posts: [
       { id:1, post: "It is very good day", likes: 23},
        {id:2, post: "Yo yo", likes: 5}
    ]
}


const profileReducer = (state=initialState,action) => {
    const {payload} = action
    switch (action.type) {
        case SET_USER_PROFILE:
            return {
                ...state,profile: payload
            }
        case SET_STATUS:
            return {
                ...state,status:payload
            }
            case SET_PHOTO:
              
                return {
                    ...state, profile: {...state.profile,photos:payload}
                }

        default:
            return state

    }

}

const setUserProfile = (payload) => ({type:SET_USER_PROFILE,payload})
const setStatus = (payload) => ({type:SET_STATUS,payload})
const setPhoto = (payload) => ({type:SET_PHOTO,payload})



export const getProfile = (userId) => async(dispatch) => {
    const response = await profileAPI.getProfile(userId)
    dispatch(setUserProfile(response.data))

}

export const getStatus = (userId) => async(dispatch) => {
    const response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data))
}

export const updateStatus = (status) => async(dispatch) => {
const response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
    dispatch(setStatus(status))
    }
}

export const updatePhoto = (photo) => async(dispatch) => {
    const response = await profileAPI.updatePhoto(photo)
    if (response.data.resultCode === 0) {
        dispatch(setPhoto(response.data.data.photos))
    }
}

export default profileReducer;