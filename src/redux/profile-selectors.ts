import {AppStateType} from "./redux-store";


export const getProfileSelector = (state:AppStateType) => state.profilePage.profile

export const getAutorizaionedUserId = (state:AppStateType) => state.authPage.userId

export const getStatusSelector = (state:AppStateType) => state.profilePage.status

export const getPostsSelectors = (state:AppStateType) => state.profilePage.posts