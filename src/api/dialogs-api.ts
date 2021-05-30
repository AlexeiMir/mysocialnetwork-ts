import {GetAllDialogsType, GetItemsType, instance, SendMessageType} from "./api";
import {MessageType} from "../types/types";


export const dialogsAPI = {
    /*     start chatting, refresh your companion so that he was on top
      */
    startChatting(userId:number) {
        return instance.put<SendMessageType>(`dialogs/${userId}`).then(res => res.data)
    },
    // get all dialogs
    getAllDialogs() {
        return instance.get<GetAllDialogsType>(`dialogs`).then(res => res.data)
    },
    //get list of messages with your friend
    getListsMessages(userId:number) {
        return instance.get<GetItemsType<MessageType>>(`dialogs/${userId}/messages`).then(res => res.data)
    },
    //send message to your friend
    sendMessageToFriend(body:string, userId:number) {
        return instance.post<SendMessageType>(`dialogs/${userId}/messages`, {body}).then(res => res.data)
    },
    //delete only for you, not for your companion
    deleteMessageForYou(messageId:string) {
        return instance.delete<SendMessageType>(`dialogs/messages/${messageId}`)
    },
    //list of new messages
    getListNewMessagesCount() {
        return instance.get<number>(`dialogs/messages/new/count`).then(res => res.data)
    },
    messageToSpam(messageId:string) {
        return instance.post<SendMessageType>(`dialogs/messages/${messageId}/spam`).then(res => res.data)
    },
    restoreMessage(messageId:string) {
        return instance.put<SendMessageType>(`dialogs/messages/${messageId}/restore`).then(res => res.data)
    },
    //is your message viewed
    messageIsViewed(messageId:string) {
        return instance.get<SendMessageType>(`dialogs/messages/${messageId}/viewed`).then(res => res.data)
    }

}