import React from "react";
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";

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

const Dialogs = ({dialogs}) => {
    const classes = useStyles();
    return <>
        <Grid item xs={6}>
            <DialogItem dialogs={dialogs}/>
        </Grid>
        <Grid item xs={6}>
            <Message/>
        </Grid>
    </>
}
export default Dialogs;