import React, {useEffect, useState} from "react";
import TextField from "@material-ui/core/TextField";

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
            : <span onDoubleClick={() =>{setEditeMode(true)}}>{status || "---"}</span>
        }

        </>
}

export default ProfileStatus;