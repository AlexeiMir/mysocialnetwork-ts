import React from "react";
import s from "../Dialogs/Dialogs.module.css";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import RestoreOutlinedIcon from '@material-ui/icons/RestoreOutlined';
import IconButton from "@material-ui/core/IconButton";
import userPhoto from "../../assets/images/user.png"
import Tooltip from "@material-ui/core/Tooltip";




const Spam = ({spam,handleRestoreMessage,profile}) => {


    return <div >
        {spam.length ? spam.map(message => {
            return <div className={s.spamMessages}>
                <div className={s.userMessage}>
                    <div className={s.userInfo}>
                        <div className={s.messageAvatar}>
                             <Avatar src={profile.photos.small ? profile.photos.small : userPhoto }/>
                        </div>
                        <div className={s.messageSender}>
                            <Typography color="textPrimary">
                                {message.senderName}
                            </Typography>
                        </div>
                    </div>
                    <div className={s.messageBody}>

                        <div className={s.messageText}>

                        </div>
                        {message.body}
                        <div className={s.messageAttributs}>
                            <div className={s.date}>
                                {`${message.addedAt.slice(8, 10)}.${message.addedAt.slice(5, 7)}.${message.addedAt.slice(0, 4)}`}
                            </div>
                            <div className={s.hour}>
                                {`${message.addedAt.slice(11, 13)}.${message.addedAt.slice(14, 16)}`}
                            </div>
                        </div>
                    </div>

                </div>
                <div className={s.btnRestore}>
                    <Tooltip title="Восстановить">
                        <IconButton color="primary" onClick={() => handleRestoreMessage(message.id)}>
                            <RestoreOutlinedIcon fontSize={"large"}/>
                        </IconButton>
                    </Tooltip>
                </div>

            </div>
        })
            : <div className={s.withoutSpam}>
                <Typography color="textPrimary" component="h2">
                    Нет сообщений, отправленных в спам
                </Typography>
            </div>}

    </div>
}

export default Spam;