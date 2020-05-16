import React from 'react'
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import FolderIcon from "@material-ui/icons/Folder";
import ListItemText from "@material-ui/core/ListItemText";
import {NavLink} from "react-router-dom";



const DialogItem = ({dialogs}) => {

    return <>
        <List>
            {dialogs ? dialogs.map(dialog =>
                <ListItem key={dialog.id}>
                    <NavLink to={"dialogs/"+ dialog.id}>
                    <ListItemAvatar>
                        <Avatar>
                            <FolderIcon/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={dialog.name}
                    />
                    </NavLink>
                </ListItem>)
                : null
            }
        </List>
        </>

}

export default DialogItem;