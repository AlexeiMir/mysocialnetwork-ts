import React, {useState} from "react";
import s from "./ProfileInfo.module.css"
import Grid from "@material-ui/core/Grid";
import userPhoto from '../../../assets/images/user.png'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import AccountBoxOutlinedIcon from '@material-ui/icons/AccountBoxOutlined';
import ProfileData from "./ProfileData";
import Preloader from "../../common/Preloader";
import ProfileStatus from "./ProfileStatus";
import IconButton from "@material-ui/core/IconButton";
import EditePopupProfileInfoRedux from "./EditePopupProfileInfo";
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import {makeStyles} from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
    fab: {
        margin: theme.spacing(2),
    }
}));

const ProfileInfo = ({profile, handleUpdateStatus, status, isOwner, handleUploadPhoto, handleUpdateProfile}) => {
    const [confirmOpen, setConfirmOpen] = useState(false);
    const classes = useStyles();


    const onMainPhotoSelect = (e) => {
        if (e.target.files.length) {
            handleUploadPhoto(e.target.files[0])
        }
    }

    const submit = (profileData) => {
        handleUpdateProfile(profileData)
    }

    return <>
        <div className={s.descriptionBlock}>
            <Grid container className={s.coverPhoto}>
                <Grid item xs={12}>
                    <img
                        src="https://22qnf42qu4jl3jax7jw7r5in-wpengine.netdna-ssl.com/wp-content/uploads/2020/04/Survival-Thrival-Update-from-Front-Lines.jpg"/>
                </Grid>
            </Grid>


            <div className={s.descriptionPerson}>
                <Grid container justify="center">
                    <Grid item xs={8}>
                        <Grid container justify="center" alignItems="flex-start" spacing={3}>

                            <Grid item xs={6}>
                                <Grid container justify="center" direction="column">
                                    <Grid item xs className={s.mainPhoto}>
                                        <img src={profile.photos.large || userPhoto}/>
                                    </Grid>
                                    <Grid item xs>
                                        <Tooltip title="Для изменения статуса двойной клик" aria-label="add">

                                            <ProfileStatus handleUpdateStatus={handleUpdateStatus} status={status}/>

                                        </Tooltip>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={6}>
                                <div className={s.settings}>
                                    <div className={s.photoSettings}>
                                        <input id="icon-button-file" type={"file"} className={s.fileBtn}
                                               onChange={onMainPhotoSelect}/>
                                        {isOwner &&
                                        <Tooltip title="Загрузка фото профиля" aria-label="add">
                                            <Fab color="primary" className={classes.fab}>
                                                <label htmlFor="icon-button-file" >
                                                    <IconButton aria-label="settings" component="span">
                                                        <PhotoCamera fontSize={"large"}
                                                                     className={s.uploadOutlined}/>
                                                    </IconButton>
                                                </label>
                                            </Fab>
                                        </Tooltip>
                                        }
                                    </div>
                                    <div className={s.profileSettings}>
                                        {isOwner &&
                                        <Tooltip title="Редактирование профиля" aria-label="add"><IconButton
                                            color="primary" aria-label="settings"
                                            component="span" onClick={() => setConfirmOpen(true)}>
                                            <Fab color="primary" className={classes.fab}>
                                                <AccountCircleOutlinedIcon fontSize={"large"}
                                                />
                                            </Fab>
                                        </IconButton>
                                        </Tooltip>
                                        }
                                        <EditePopupProfileInfoRedux onSubmit={submit} open={confirmOpen}
                                                                    setOpen={setConfirmOpen} profile={profile}/>
                                    </div>
                                </div>
                            </Grid>

                        </Grid>
                    </Grid>
                </Grid>

                <Grid container className={s.profileData}>
                    <Grid item xs={12}>
                        <ProfileData profile={profile}/>
                    </Grid>
                </Grid>

            </div>
        </div>
    </>
}


export default ProfileInfo;

