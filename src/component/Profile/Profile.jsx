import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPosts from "./MyPosts/MyPosts";
import Preloader from "../common/Preloader"


const Profile = ({profile,handleUpdateStatus,status,isOwner,handleUploadPhoto,posts}) => {

    if (!profile) {
        return <Preloader/>
    }

    return <>
        <ProfileInfo profile={profile} handleUpdateStatus={handleUpdateStatus}
                     status={status} isOwner={isOwner}  handleUploadPhoto={handleUploadPhoto}  />
        <MyPosts posts={posts} profile={profile} />

        </>
}
export default Profile;