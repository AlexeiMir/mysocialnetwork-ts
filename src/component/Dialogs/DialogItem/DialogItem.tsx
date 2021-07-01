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
import {DialogType, ProfileType} from "../../../types/types";

type PropsType = {
    dialog: DialogType
    handleListMessages : (userId:number) => void
    profile: ProfileType | null
}


const DialogItem: React.FC<PropsType> = ({dialog, handleListMessages, profile}) => {


    return <>

        <List>
            <ListItem className={s.item + ' ' +
            (profile && profile.userId === dialog.id && s.active)}>
                <NavLink className={s.itemText} to={"dialogs/" + dialog.id}
                         onClick={() => handleListMessages(dialog.id)}>
                    <ListItemAvatar>
                        <Avatar src={dialog.photos.large ? dialog.photos.large : userPhoto}/>
                    </ListItemAvatar>
                    <ListItemText
                        primary={dialog.userName} secondary={"New messages:" + ' '+ (dialog.hasNewMessages ? dialog.newMessagesCount : '')}
                    />
                </NavLink>
            </ListItem>
        </List>

    </>

}

export default DialogItem;