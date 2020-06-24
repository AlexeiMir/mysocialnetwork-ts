import React, {useEffect, useState} from "react";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from '@material-ui/core/Typography';

const ProfileStatus = ({handleUpdateStatus,status}) => {
    const [localStatus,setStatus] = useState(status);
    const [editeMode,setEditeMode] = useState(false);

    const deactivateEditeMode = (e) => {
        setEditeMode(false)
        handleUpdateStatus(e.target.value)
    }

    useEffect(() => {
        setStatus(status)
    },[status])

    return <>
        {editeMode
            ? <TextField onBlur={deactivateEditeMode} autoFocus={true}  defaultValue={localStatus} onChange={(e)=>{setStatus(e.target.value)}} />
            : <span onDoubleClick={() =>{setEditeMode(true)}}>
                    <Tooltip title="Изменяется двойным кликом" aria-label="add"><Typography variant="h6" gutterBottom>{status || "---"}</Typography></Tooltip></span>
        }

        </>
}

export default ProfileStatus;