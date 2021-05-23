import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import Preloader from "../common/Preloader"
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {ProfileType} from "../../types/types";

export type ProfilePropsType = {
    profile: ProfileType | null
    handleUpdateStatus: (status:string) => void
    status: string
    isOwner: boolean
    handleUploadPhoto: (photo:File) => void
    handleUpdateProfile: (profile: ProfileType) => Promise<any>
}

const Profile: React.FC<ProfilePropsType> = (props) => {

    if (!props.profile) {
        return <Preloader/>
    }

    return <>
        <ProfileInfo {...props}  />
        <MyPostsContainer />

        </>
}
export default Profile;