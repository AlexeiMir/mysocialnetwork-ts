import React from "react";
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

const Dialogs = ({dialogs,handleListMessages,messages,handleSendMessage}) => {
    const classes = useStyles();
    const onSubmit = (formData) => {
            handleSendMessage(formData.message)
    } 

    return <>
        <Grid item xs={6}>
            {dialogs.length ? dialogs.map(dialog => <DialogItem key={dialog.id} dialog={dialog} handleListMessages={handleListMessages}/>)
            : null}
        </Grid>
        <Grid item xs={6} className={s.messages}>
            {messages.length ? messages.map(message => <Message  message={message}/> ) : null}
            <AddMessageFormRedux onSubmit={onSubmit} />
        </Grid>
    </>
}
export default Dialogs;