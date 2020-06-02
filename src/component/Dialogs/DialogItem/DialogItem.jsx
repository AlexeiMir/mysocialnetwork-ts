import React from 'react'
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import FolderIcon from "@material-ui/icons/Folder";
import ListItemText from "@material-ui/core/ListItemText";
import {NavLink} from "react-router-dom";
import userPhoto from "../../../assets/images/man.png"
import s from "./DialogItem.module.css"



const DialogItem = ({dialog,handleListMessages}) => {

    return <>
        <List>
                <ListItem className={s.item}>
                    <NavLink to={"dialogs/"+ dialog.id} onClick={() => handleListMessages(dialog.userName)}>
                    <ListItemAvatar>
                        <Avatar src={userPhoto}/>
                    </ListItemAvatar>
                    <ListItemText
                        primary={dialog.userName} secondary={dialog.hasNewMessages ? dialog.newMessagesCount : null }
                    />
                    </NavLink>
                </ListItem>
        </List>
        </>

}

export default DialogItem;