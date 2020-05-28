import React from "react";
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';

const Message = ({message}) => {
    return <>
     <Chip 
        avatar={<Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />}
        label={message}
        //onDelete={handleDelete}
        variant="outlined"
      />
    </>

}

export default Message;