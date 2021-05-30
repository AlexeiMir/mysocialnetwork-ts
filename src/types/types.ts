import {ResultCodesEnum} from '../api/api'
import {dialogsAPI} from "../api/dialogs-api";

export type PhotosType = {
    small: string | null
    large: string | null
}


export type UserType = {
    id: number
    name: string
    status: string
    photos: PhotosType
    followed:boolean
}

export type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}

export type ProfileType = {
    userId: number
    aboutMe: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType
}

export type PostType = {
    id: number
    post: string
    likes: number
}

export type MessageType = {
    id: string
    body: string
    translatedBody: null
    addedAt: string
    senderId: number
    senderName: string
    recipientId: number
    recipientName?: string
    viewed: boolean
    deletedBySender?: boolean,
    deletedByRecipient?: boolean
    isSpam?: boolean
    distributionId?: null
}
export type MessageTypeInMessage = {
    message: MessageType
}

export type DialogType = {
    id:number,
    userName:string,
    hasNewMessages:boolean,
    lastDialogActivityDate:string,
    lastUserActivityDate:string,
    newMessagesCount:number,
    photos:PhotosType
}



/*
getAllDialogs
    [{"id":8905,"userName":"MirAlexei","hasNewMessages":false,"lastDialogActivityDate":"2020-06-26T08:48:12.417",
    "lastUserActivityDate":"2020-07-01T04:29:43.883","newMessagesCount":0,"photos":{"small":null,"large":null}},
    {"id":8386,"userName":"Vlada","hasNewMessages":false,"lastDialogActivityDate":"2020-06-23T10:23:59.623",
        "lastUserActivityDate":"2020-06-20T15:02:43.207","newMessagesCount":0,"photos":{"small":null,"large":null}},
    {"id":8565,"userName":"sonic","hasNewMessages":false,"lastDialogActivityDate":"2020-06-15T10:52:38.01",
        "lastUserActivityDate":"2020-06-16T11:18:29.427","newMessagesCount":0,"photos":{"small":null,"large":null}},
    {"id":7989,"userName":"Anuar","hasNewMessages":false,"lastDialogActivityDate":"2020-05-13T10:56:22.773",
        "lastUserActivityDate":"2020-06-05T19:32:19.48","newMessagesCount":0,"photos":{"small":null,"large":null}},
    {"id":7988,"userName":"Yaroslav1321","hasNewMessages":false,"lastDialogActivityDate":"2020-05-13T10:33:58.72",
        "lastUserActivityDate":"2020-05-12T21:51:05.523","newMessagesCount":0,"photos":{"small":null,"large":null}}]

getListsMessages
{"items":[{"id":"6e47540c-97b3-47da-9c0e-392063ac1016","body":"Второе сообщение","translatedBody":null,
"addedAt":"2020-06-24T09:43:03.14","senderId":5572,"senderName":"AlexeiMir","recipientId":8905,"viewed":true},
{"id":"53de27e2-e9c5-442a-81e0-7f314fc09bfb","body":"4 сообщение","translatedBody":null,"addedAt":
"2020-06-24T10:33:00.313","senderId":5572,"senderName":"AlexeiMir","recipientId":8905,"viewed":true},
{"id":"0a3367e3-f64e-4a6e-963c-ea5904628b51","body":"Получил сообщение","translatedBody":null,"addedAt":
"2020-06-25T09:45:51.877","senderId":5572,"senderName":"AlexeiMir","recipientId":8905,"viewed":true},
{"id":"11d71db1-c1c8-4dd3-9563-c3e3fb605e1d","body":"Тест 1","translatedBody":null,"addedAt":"2020-06-25T10:37:03.613",
"senderId":5572,"senderName":"AlexeiMir","recipientId":8905,"viewed":true},{"id":"be09d1a7-1ebe-4e9b-b903-7f38e5a56dd6",
"body":"Сообщение для спама 1","translatedBody":null,"addedAt":"2020-06-26T08:47:55.9","senderId":8905,
"senderName":"MirAlexei","recipientId":5572,"viewed":true},{"id":"d161048b-c38e-4583-9b84-47b4472e94c1",
"body":"Сообщение для спама 2","translatedBody":null,"addedAt":"2020-06-26T08:48:12.417","senderId":8905,
"senderName":"MirAlexei","recipientId":5572,"viewed":true}],"totalCount":6,"error":null}


sendMessageToFriend
{"data":{"message":{"id":"6de2b96c-dc51-4114-bd72-a7009a1e6a0e","body":"еще одно сообщение","translatedBody":null,
    "addedAt":"2021-05-30T04:17:21.033","senderId":5572,"senderName":"AlexeiMir","recipientId":8905,"recipientName":
    "MirAlexei","viewed":false,"deletedBySender":false,"deletedByRecipient":false,"isSpam":false,"distributionId":null}},
    "messages":[],"fieldsErrors":[],"resultCode":0}
*/

