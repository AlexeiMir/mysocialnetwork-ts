import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPosts from "./MyPosts/MyPosts";


const Profile = ({profile,handleUpdateStatus,status,isOwner,handleUploadPhoto}) => {

    return <>
        <ProfileInfo profile={profile} handleUpdateStatus={handleUpdateStatus}
                     status={status} isOwner={isOwner}  handleUploadPhoto={handleUploadPhoto}/>
        <MyPosts/>

        </>
}
export default Profile;