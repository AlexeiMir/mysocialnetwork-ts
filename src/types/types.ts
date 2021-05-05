import {ResultCodesEnum} from '../api/api'

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
    recipientName: string
    viewed: boolean
    deletedBySender: boolean,
    deletedByRecipient: boolean
    isSpam: boolean
    distributionId: null
}

export type DialogType = {
    message: MessageType
    messages: Array<MessageType>
    resultCode: ResultCodesEnum
}


//{"data":{"message":{"id":"fddcc178-8c84-468d-915b-4cec742750da","body":"мввпвпвп",
// "translatedBody":null,
// "addedAt":"2020-06-13T06:20:59.083","senderId":5572,"senderName":"AlexeiMir",
// "recipientId":8386,"recipientName":"Vlada",
// "viewed":false,"deletedBySender":false,"deletedByRecipient":false,"isSpam":false,
// "distributionId":null}},"messages":[],
// "resultCode":0}
