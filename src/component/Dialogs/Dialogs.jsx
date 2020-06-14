import React, {useEffect, useState} from "react";
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import s from "../Dialogs/Dialogs.module.css"
import AddMessageFormRedux from "./Message/AddMessageForm"

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

const Dialogs = ({dialogs, messages, getAllMessagesUser, getNewUserProfile, handleSendMessage, userProfile,
                     myId,myPhoto,login}) => {


    const classes = useStyles();



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
                {dialogs.length ? dialogs.map(dialog => <DialogItem key={dialog.id} dialog={dialog}
                                                                    profile={userProfile}
                                                                    handleListMessages={handleListMessages}/>)
                    : null}
            </Grid>
            <Grid item xs={8} className={s.messages}>
                {messages.length ? messages.map(message => <Message key={message.id} message={message}
                                                                    myId={myId} myPhoto={myPhoto}
                                                                    login={login} userProfile={userProfile}/>) : null}
                <AddMessageFormRedux onSubmit={onSubmit}/>
            </Grid>
        </Grid>
    </>
}
export default Dialogs;