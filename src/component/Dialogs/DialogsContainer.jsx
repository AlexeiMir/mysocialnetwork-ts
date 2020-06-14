import React, {useEffect, useState} from 'react'
import Dialogs from "./Dialogs";
import {useDispatch, useSelector} from "react-redux";
import {getAllDialogs,getListMessages,sendMessage} from "../../redux/dialogs-reducer";
import Preloader from "../common/Preloader";
import {getProfile} from "../../redux/profile-reducer"
import {compose} from "redux";
import {getMyPhoto} from "../../redux/auth-reducer";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";


const DialogsContainer = () => {
    const dialogs = useSelector(state => state.dialogsPage.dialogs)
    const messages = useSelector(state => state.dialogsPage.messages)
    const isFetching = useSelector(state => state.dialogsPage.isFetching)
    const profile = useSelector(state => state.profilePage.profile)
    const myId = useSelector(state => state.authPage.userId)
    const myPhoto = useSelector(state => state.authPage.myPhoto)
    const login = useSelector(state => state.authPage.login)

    const dispatch = useDispatch()
    const [userProfile, setUserProfile] = useState(profile)

    useEffect(() => {
        dispatch(getAllDialogs())
        dispatch(getMyPhoto(myId))
    },[dispatch])

    useEffect(() => {
        setUserProfile(profile)
    },[profile])

    const getAllMessagesUser = (userId) => dispatch(getListMessages(userId))
    const handleSendMessage = (message,userId) => dispatch(sendMessage(message,userId))
    const getNewUserProfile = (userId) => dispatch(getProfile(userId))


    return <>

        {isFetching
        ? <Preloader/>:null}
        <Dialogs dialogs={dialogs} getAllMessagesUser={getAllMessagesUser} messages={messages}
         handleSendMessage={handleSendMessage} getNewUserProfile={getNewUserProfile} userProfile={userProfile}
                 myId={myId} myPhoto={myPhoto} login={login}
        />

        </>
}

export default compose(withAuthRedirect)(DialogsContainer)