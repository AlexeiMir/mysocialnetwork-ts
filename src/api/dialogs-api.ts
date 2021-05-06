import {instance} from "./api";
import {APIResponseType} from './api'

export const dialogsAPI = {
    /*     start chatting, refresh your companion so that he was on top
      */
    startChatting(userId) {
        return instance.put<APIResponseType>(`dialogs/${userId}`).then(res => res.data)
    },
    // get all dialogs
    getAllDialogs() {
        return instance.get<APIResponseType>(`dialogs`).then(res => res.data).then(res => res.data)
    },
    //get list of messages with your friend
    getListsMessages(userId) {
        return instance.get<APIResponseType>(`dialogs/${userId}/messages`).then(res => res.data)
    },
    //send message to your friend
    sendMessageToFriend(body, userId) {
        return instance.post<APIResponseType>(`dialogs/${userId}/messages`, {body}).then(res => res.data)
    },
    //delete only for you, not for your companion
    deleteMessageForYou(messageId) {
        return instance.delete(`dialogs/messages/${messageId}`)
    },
    //list of new messages
    getListNewMessagesCount() {
        return instance.get<APIResponseType>(`dialogs/messages/new/count`).then(res => res.data)
    },
    messageToSpam(messageId) {
        return instance.post<APIResponseType>(`dialogs/messages/${messageId}/spam`).then(res => res.data)
    },
    restoreMessage(messageId) {
        return instance.put<APIResponseType>(`dialogs/messages/${messageId}/restore`).then(res => res.data)
    },
    //is your message viewed
    messageIsViewed(messageId) {
        return instance.get<APIResponseType>(`dialogs/messages/${messageId}/viewed`).then(res => res.data)
    }

}