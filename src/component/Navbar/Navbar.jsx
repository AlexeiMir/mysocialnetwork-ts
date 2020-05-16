import React from 'react'
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import {NavLink} from "react-router-dom";
import s from "./Navbar.module.css"


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

const Navbar = () => {
    const classes = useStyles();

    return (
        <div className={s.nav}>
            <div className={classes.root}>
                <List component="nav" aria-label="main mailbox folders">
                    <ListItem button component={NavLink} exact to="/users">
                        <ListItemIcon>
                            <InboxIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Users"/>
                    </ListItem>
                    <ListItem button component={NavLink} exact to="/dialogs">
                        <ListItemIcon>
                            <DraftsIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Dialogs"/>
                    </ListItem>
                </List>
            </div>
        </div>
    )
}

export default Navbar;