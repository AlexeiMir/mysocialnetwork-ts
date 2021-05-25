import React, {ChangeEvent, useEffect, useState} from "react";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from '@material-ui/core/Typography';

type PropsType = {
    handleUpdateStatus: (status:string) => void
    status: string
}

const ProfileStatus: React.FC<PropsType> = ({handleUpdateStatus, status}) => {
    const [localStatus,setStatus] = useState(status);
    const [editeMode,setEditeMode] = useState(false);

    const deactivateEditeMode = () => {
        setEditeMode(false)
        handleUpdateStatus(status)
    }
    const onStatusChange = (e:ChangeEvent<HTMLInputElement>)=> {
        setStatus(e.target.value)
    }

    useEffect(() => {
        setStatus(status)
    },[status])

    return <>
        {editeMode
            ? <TextField onBlur={deactivateEditeMode} autoFocus={true}  defaultValue={localStatus} onChange={onStatusChange} />
            : <span onDoubleClick={() =>{setEditeMode(true)}}>
                    <Tooltip title="Изменяется двойным кликом" aria-label="add"><Typography variant="h6" gutterBottom>{status || "---"}</Typography></Tooltip></span>
        }

        </>
}

export default ProfileStatus;