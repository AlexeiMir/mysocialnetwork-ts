import React, {useEffect} from "react";
import Profile from "./Profile";
import {useDispatch, useSelector} from "react-redux";
import {getProfile, getStatus, updatePhoto, updateProfile, updateStatus} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {compose} from "redux";
import {getMyPhoto} from "../../redux/auth-reducer";
import {getAutorizaionedUserId, getProfileSelector, getStatusSelector} from "../../redux/profile-selectors";
import {ProfileType} from "../../types/types";

type DispatchPropsType = {
    handleUpdateStatus: (status:string) => void
    handleUploadPhoto: (photo: File) => void
    handleUpdateProfile: (profile:ProfileType) => Promise<any>
}
type PathParamsType = {
    userId: string
}

const ProfileContainer: React.FC<DispatchPropsType & RouteComponentProps<PathParamsType>> = (props) => {
    const {match,history} = props
    const profile = useSelector(getProfileSelector)
    const autorizaionedUserId = useSelector(getAutorizaionedUserId)
    const status = useSelector(getStatusSelector)
    const dispatch = useDispatch();

    let userId:number | null = +match.params.userId
    if (!userId) {
        userId = autorizaionedUserId
        if (!userId){
            history.push("/login")
        }
    }

    const refreshProfile = () => {

        if (!userId){
            console.error("ID should exists in URI params or in state ('authorizedUserId')")
        } else {
            dispatch(getProfile(userId))
            dispatch(getStatus(userId))
        }
    }

    useEffect(() => {
        refreshProfile()
    },[userId])

   useEffect(() => {
       if (!userId){
           console.error("ID should exists in URI params or in state ('authorizedUserId')")
       } else {
           dispatch(getMyPhoto(userId))
       }
   },[userId])

    const handleUpdateStatus = (status:string) => {
           dispatch(updateStatus(status))
    }

       const handleUploadPhoto = (photo:File) => {
          dispatch( updatePhoto(photo))
       }


    const handleUpdateProfile = (profileData:ProfileType) => {
        dispatch(updateProfile(profileData))
    }


    return <>
        <Profile profile={profile} handleUpdateStatus={handleUpdateStatus}
                 status={status} isOwner={!match.params.userId}
                 handleUploadPhoto={handleUploadPhoto} handleUpdateProfile={handleUpdateProfile}
        />
        </>
}

export default compose<React.ComponentType>(withRouter)(ProfileContainer);