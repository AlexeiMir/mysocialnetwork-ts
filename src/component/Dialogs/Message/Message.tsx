import React from "react";
import Avatar, { AvatarTypeMap } from '@material-ui/core/Avatar';
import Typography from "@material-ui/core/Typography";
import s from "../Dialogs.module.css"
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import Badge from '@material-ui/core/Badge';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import Tooltip from "@material-ui/core/Tooltip";
import DoneAllIcon from '@material-ui/icons/DoneAll';
import CheckIcon from '@material-ui/icons/Check';
import {PhotosType, ProfileType, MessageType} from '../../../types/types'

export type handleMessageType = (messageId:string,profileId:number) => void

type MessageTypeProps = {
    message:MessageType
    myId: number
    myPhoto: PhotosType
    userProfile: ProfileType
    handleDeleteMessage: handleMessageType
    newMessagesCount: number
    handleMessageSpam: handleMessageType
    spam: Array<MessageType>
}

const Message:React.FC<MessageTypeProps> = ({message, myId, myPhoto, userProfile,handleDeleteMessage,newMessagesCount,
                     handleMessageSpam,spam}) => {
    return <>
        <div className={s.messageWrapper + ' '+ (spam.filter(sp => sp.id === message.id).length === 0) ? '': s.spamMessage}>
            <div className={s.userMessage + ' ' + (message.senderId === myId ? s.myUserMessage : '')}>
                <div className={s.userInfo}>
                    <div className={s.messageAvatar}>
                        <Badge badgeContent={message.senderId === myId ? newMessagesCount :''} color="primary">
                        <Avatar src={message.senderId === myId ? myPhoto!.small as string | undefined : userProfile.photos.small as string | undefined}/>
                        </Badge>
                    </div>
                    <div className={s.messageSender}>
                        <Typography color="textPrimary">
                        {message.senderName}
                        </Typography>
                    </div>
                </div>
                <div className={s.messageBody + ' ' + (message.senderId === myId ? s.messageBodySender : s.messageBodyReceip)}>
                    <div className={s.messageViewed}>
                        {message.viewed
                        ? <DoneAllIcon color="primary"/>
                        : <CheckIcon color="primary"/>
                        }
                    </div>
                    <div className={s.messageText}>

                    </div>  {message.body}
                    <div className={s.messageAttributs}>
                        <div className={s.date}>
                            {`${message.addedAt.slice(8, 10)}.${message.addedAt.slice(5, 7)}.${message.addedAt.slice(0, 4)}`}
                        </div>
                        <div className={s.hour}>
                            {`${message.addedAt.slice(11, 13)}.${message.addedAt.slice(14, 16)}`}
                        </div>
                        <div className={s.deleteMessage}>
                            <IconButton aria-label="delete" onClick={() => {handleDeleteMessage(message.id,userProfile.userId)}} >
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                            <Tooltip title="В спам">
                                <IconButton color="primary" onClick={() => handleMessageSpam(message.id,userProfile.userId)}>
                                    <RemoveCircleOutlineIcon fontSize={"small"}/>
                            </IconButton>
                            </Tooltip>
                        </div>
                    </div>
                </div>

            </div>

        </div>

    </>

}

export default Message;