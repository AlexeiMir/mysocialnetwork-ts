import React, {useEffect, useState} from "react";
import Grid from '@material-ui/core/Grid';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import s from "../Dialogs/Dialogs.module.css"
import AddMessageFormRedux from "./Message/AddMessageForm"
import Search from "../../utils/Search/Search";
import {MessageType,DialogType, ProfileType, PhotosType} from '../../types/types'

type PropsType = {
    localDialogs: Array<DialogType> 
    messages: Array<MessageType>
    getAllMessagesUser: (userId:number) => void
    getNewUserProfile : (userId:number) => void
    handleSendMessage : (message:string,userId:number) => void
    userProfile : ProfileType | null
    myId: number | null
    myPhoto : PhotosType |null
    handleDeleteMessage: (messageId:string,userId:number) => void
    newMessagesCount: number
    handleSearchDialog: (dialogName:string) => void
    handleMessageSpam: (messageId:string,userId:number) => void
    spam: Array<MessageType>
}
export type AddMessageFormType = {
    newTextMessage:string
}

const Dialogs: React.FC<PropsType> = ({
                    messages, getAllMessagesUser, getNewUserProfile, handleSendMessage,
                                          userProfile,
                     myId, myPhoto, handleDeleteMessage,newMessagesCount,
                                          localDialogs,handleSearchDialog,
                     handleMessageSpam,spam
                 }) => {





    const onSubmit = (values:AddMessageFormType) => {
        handleSendMessage(values.newTextMessage, userProfile?.userId as number)
    }

    const handleListMessages = (userId:number) => {
        getNewUserProfile(userId)
        getAllMessagesUser(userId)

    }



    return <>
        <Grid container spacing={3}>
            <Grid item xs={4}>
                <div className={s.searchName}>
                    <Search handleSearch={handleSearchDialog}/>
                </div>
                <div className={s.dialogs}>
                {localDialogs.length ? localDialogs.map(dialog => <DialogItem key={dialog.id} dialog={dialog}
                                                                    profile={userProfile}
                                                                    handleListMessages={handleListMessages}


                    />)
                    : null}
                </div>
            </Grid>
            <Grid item xs={8}>
                <div className={s.messages}>
                    {messages.length ? messages.map(message => <Message key={message.id}
                                                                        message={message}
                                                                        myId={myId}
                                                                        myPhoto={myPhoto}
                                                                        userProfile={userProfile}
                                                                        handleDeleteMessage={handleDeleteMessage}
                                                                        newMessagesCount={newMessagesCount}
                                                                        handleMessageSpam={handleMessageSpam}
                                                                        spam={spam}
                    />) : null}
                </div>
                <div className={s.dialogForm}>
                    <AddMessageFormRedux onSubmit={onSubmit}/>
                </div>
            </Grid>
        </Grid>
    </>
}
export default Dialogs;