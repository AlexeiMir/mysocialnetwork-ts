import {AppStateType} from "./redux-store";

export const selectNewMessagesCount = (state:AppStateType) => {
    return state.dialogsPage.newMessagesCount
}

export const getDialogsSelector = (state:AppStateType) => state.dialogsPage.dialogs

export const getMessagesSelector = (state:AppStateType) => state.dialogsPage.messages

export const getIsFetchingSelector = (state:AppStateType) => state.dialogsPage.isFetching

export const getSpamSelector = (state:AppStateType) => state.dialogsPage.spam