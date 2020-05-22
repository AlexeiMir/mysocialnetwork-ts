import {profileAPI} from "../api/api";

const SET_USER_PROFILE = "SET_USER_PROFILE"
const SET_STATUS = "SET_STATUS"


const initialState = {
    profile:null,
    status:"some"
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

        default:
            return state

    }

}

const setUserProfile = (payload) => ({type:SET_USER_PROFILE,payload})
const setStatus = (payload) => ({type:SET_STATUS,payload})

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
        dispatch(setPhoto(response.data))
    }
}

export default profileReducer;