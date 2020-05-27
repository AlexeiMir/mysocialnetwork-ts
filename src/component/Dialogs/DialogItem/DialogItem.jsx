import React from 'react'
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import FolderIcon from "@material-ui/icons/Folder";
import ListItemText from "@material-ui/core/ListItemText";
import {NavLink} from "react-router-dom";
import userPhoto from "../../../assets/images/man.png"



const DialogItem = ({dialogs}) => {

    return <>
        <List>
            {dialogs ? dialogs.map(dialog =>
                <ListItem key={dialog.id}>
                    <NavLink to={"dialogs/"+ dialog.id}>
                    <ListItemAvatar>
                        <Avatar src={dialog.photos.small ? dialog.photos.small : userPhoto }/>
                    </ListItemAvatar>
                    <ListItemText
                        primary={dialog.userName}
                    />
                    </NavLink>
                </ListItem>)
                : null
            }
        </List>
        </>

}

export default DialogItem;