import React from "react";
import s from "./ProfileInfo.module.css"
import {ContactsType, ProfileType} from "../../../types/types";
import { GetStringKeys } from "../../../FormsControls/FormsControls";

type ContactsPropsType = {
    contactTitle: string
    contactValue: string
}

const Contact: React.FC<ContactsPropsType> = ({contactTitle,contactValue}) => {
    return <div><b>{contactTitle}</b>:{contactValue}</div>

}

type ProfileDataPropsType = {
    profile: ProfileType
}

const ProfileData: React.FC<ProfileDataPropsType> = ({profile}) => {

    return <div className={s.profileDescription}>
        <div className={s.firstDescription}>
            <div className={s.row}>
                <div><b>Full name</b></div>
                <div>{profile.fullName}</div>
            </div>
            <div className={s.row}>
                <div><b>Looking for a job</b></div>
                <div>{profile.lookingForAJob ? "yes" : "no"}</div>
            </div>
            {profile.lookingForAJob && <div className={s.row}>
                <div><b><b>My professionals skills</b></b></div>
                <div>{profile.lookingForAJobDescription}</div>
            </div>}
            <div className={s.row}>
                <div><b>About me</b></div>
                <div>{profile.aboutMe}</div>
            </div>
        </div>
        <div className={s.secondDescription}>
            <div className={s.row}>
                <div><b>Contacts</b>:</div>
            </div>
            <div className={s.row}>
                <div className={s.rowContacts}>{Object.keys(profile.contacts).map(key => {
                    return <Contact
                        key={key} contactTitle={key} contactValue={profile.contacts[key as keyof ContactsType] }/>
                })}</div>
            </div>
        </div>
    </div>
}


export default ProfileData;