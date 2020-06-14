import React from "react";
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';

const Message = ({message,myId,myPhoto,login,userProfile}) => {
    return <>
        <Grid container spacing={3}>
            <Grid item xs={6}>
                <Chip
                    avatar={<Avatar alt="Natacha" src={message.senderId === myId ? myPhoto.small : userProfile.photos.small}/>}
                    label={message.body}
                    //onDelete={handleDelete}
                    variant="outlined"
                />
            </Grid>
            <Grid item xs={6}>
                <div>
                    {`${message.addedAt.slice(8, 10)}.${message.addedAt.slice(5, 7)}
                    .${message.addedAt.slice(0, 4)} - ${message.addedAt.slice(11, 19)}`}
                </div>
            </Grid>
        </Grid>
    </>

}

export default Message;