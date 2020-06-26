import React, {useEffect, useState} from "react";
import Grid from '@material-ui/core/Grid';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import s from "../Dialogs/Dialogs.module.css"
import AddMessageFormRedux from "./Message/AddMessageForm"
import Search from "../../utils/Search/Search";



const Dialogs = ({
                     dialogs, messages, getAllMessagesUser, getNewUserProfile, handleSendMessage, userProfile,
                     myId, myPhoto, login,handleDeleteMessage,newMessagesCount,localDialogs,handleSearchDialog,
                     handleMessageSpam,spam
                 }) => {





    const onSubmit = (values) => {
        handleSendMessage(values.newTextMessage, userProfile.userId)
    }

    const handleListMessages = (id) => {
        getNewUserProfile(id)
        getAllMessagesUser(id)

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
                    {messages.length ? messages.map(message => <Message key={message.id} message={message}
                                                                        myId={myId} myPhoto={myPhoto}
                                                                        login={login}
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