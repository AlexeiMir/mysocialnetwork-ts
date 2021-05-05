import {instance} from "./api";

export const dialogsAPI = {
    /*     start chatting, refresh your companion so that he was on top
      */
    startChatting(userId) {
        return instance.put(`dialogs/${userId}`)
    },
    // get all dialogs
    getAllDialogs() {
        return instance.get(`dialogs`)
    },
    //get list of messages with your friend
    getListsMessages(userId) {
        return instance.get(`dialogs/${userId}/messages`)
    },
    //send message to your friend
    sendMessageToFriend(body, userId) {
        return instance.post(`dialogs/${userId}/messages`, {body})
    },
    //delete only for you, not for your companion
    deleteMessageForYou(messageId) {
        return instance.delete(`dialogs/messages/${messageId}`)
    },
    //list of new messages
    getListNewMessagesCount() {
        return instance.get(`dialogs/messages/new/count`)
    },
    messageToSpam(messageId) {
        return instance.post(`dialogs/messages/${messageId}/spam`)
    },
    restoreMessage(messageId) {
        return instance.put(`dialogs/messages/${messageId}/restore`)
    },
    //is your message viewed
    messageIsViewed(messageId) {
        return instance.get(`dialogs/messages/${messageId}/viewed`)
    }

}