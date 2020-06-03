import React, {useEffect} from 'react'
import Dialogs from "./Dialogs";
import {useDispatch, useSelector} from "react-redux";
import {getAllDialogs,getListMessages,sendMessage} from "../../redux/dialogs-reducer";
import Preloader from "../common/Preloader";
import {getProfile} from "../../redux/profile-reducer"


const DialogsContainer = () => {
    const dialogs = useSelector(state => state.dialogsPage.dialogs)
    const messages = useSelector(state => state.dialogsPage.messages)
    const isFetching = useSelector(state => state.dialogsPage.isFetching)
    const profile = useSelector(state => state.profilePage.profile)
    
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllDialogs())
    },[dispatch])

    const getAllMessagesUser = (userId) => dispatch(getListMessages(userId))
    const handleSendMessage = (message,userId) => dispatch(sendMessage(message,userId))
    const getNewUserProfile = (userId) => dispatch(getProfile(userId))


    return <>

        {isFetching
        ? <Preloader/>:null}
        <Dialogs dialogs={dialogs} getAllMessagesUser={getAllMessagesUser} messages={messages}
         handleSendMessage={handleSendMessage} getNewUserProfile={getNewUserProfile} profile={profile}  />

        </>
}

export default DialogsContainer