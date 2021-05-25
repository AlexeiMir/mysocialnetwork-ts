import React, {useState} from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {renderCheckbox, renderTextField} from "../../../FormsControls/FormsControls";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import s from "./ProfileInfo.module.css"
import style from "../../../FormsControls/FormsControls.module.css"
import {ProfileType} from "../../../types/types";

type PropsType = {
    profile: ProfileType
    open: boolean
    setOpen: (open:boolean) => void
}

const EditePopupProfileInfo: React.FC<InjectedFormProps<ProfileType,PropsType> & PropsType> =
    ({profile,handleSubmit,open,setOpen,error}) => {

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth='xl'>
                <DialogTitle id="form-dialog-title">Editing profile</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Update your profile
                    </DialogContentText>

                    <form onSubmit={handleSubmit} className={s.profileDescription}>
                        <div className={s.firstDescription}>
                            {error && <div className={style.formSummaryError}>
                                {error}
                            </div>}
                            <div className={s.row}>
                                <div><b>Full name:</b></div>
                                <Field name="fullName" component={renderTextField} label="Full name"
                                       multiline={false} rows={1} placeholder={profile.fullName}  />
                            </div>
                            <div className={s.row}>
                                <div><b>Looking for a job:</b></div>
                                <Field name="lookingForAJob" component={renderCheckbox}
                                       label="Looking for a job" multiline={false} rows={1} placeholder={profile.lookingForAJob}  />
                            </div>
                            <div className={s.row}>
                                <div><b><b>My professionals skills:</b></b></div>
                                <Field name="lookingForAJobDescription" component={renderTextField}
                                       label="My professionals skills" multiline={true} rows={3} placeholder={profile.lookingForAJobDescription} />
                            </div>
                            <div className={s.row}>
                                <div><b>About me:</b></div>
                                <Field name="aboutMe" component={renderTextField} label="About me"
                                       multiline={true} rows={3} placeholder={profile.aboutMe} />
                            </div>
                        </div>
                        <div className={s.secondDescription}>
                            <div className={s.row}>
                                <div><b>Contacts</b>:</div>
                            </div>
                            
                                <div className={s.contacts}>{Object.keys(profile.contacts).map(key => {
                                    return <>
                                        <div key={key} className={s.contactsField}>
                                        <b>{key}:</b>
                                            <Field name={"contacts."+key} component={renderTextField} label={key}
                                                   multiline={false} rows={1} placeholder={key}  /></div></>
                                })}</div>
                            </div>
                        
                            <DialogActions>
                        <Button onClick={handleClose} color="primary" component='button'>
                            Close
                        </Button>
                    <Button type="submit" color="primary" onClick={handleClose} component='button'>
                        Save
                    </Button>
                </DialogActions>
                    </form>

                </DialogContent>
               
            </Dialog>
        </div>
    );
}

const EditePopupProfileInfoRedux = reduxForm({form:'edite-profile'})(EditePopupProfileInfo)

export default EditePopupProfileInfoRedux;