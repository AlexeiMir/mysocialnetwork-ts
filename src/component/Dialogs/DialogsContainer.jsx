import React, {useEffect, useState} from 'react'
import Dialogs from "./Dialogs";
import {useDispatch, useSelector} from "react-redux";
import {deleteMessage, getAllDialogs, getListMessages, messageToSpamTC, sendMessage} from "../../redux/dialogs-reducer";
import Preloader from "../common/Preloader";
import {getProfile} from "../../redux/profile-reducer"
import {compose} from "redux";
import {getMyPhoto} from "../../redux/auth-reducer";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";


const DialogsContainer = () => {
    const dialogs = useSelector(state => state.dialogsPage.dialogs)
    const messages = useSelector(state => state.dialogsPage.messages)
    const isFetching = useSelector(state => state.dialogsPage.isFetching)
    const newMessagesCount = useSelector(state => state.dialogsPage.newMessagesCount)
    const spam = useSelector(state => state.dialogsPage.spam)
    const profile = useSelector(state => state.profilePage.profile)
    const myId = useSelector(state => state.authPage.userId)
    const myPhoto = useSelector(state => state.authPage.myPhoto)
    const login = useSelector(state => state.authPage.login)

    const dispatch = useDispatch()
    const [userProfile, setUserProfile] = useState(profile)
    const [localDialogs,setDialog] = useState(dialogs)


    useEffect(() => {
        dispatch(getAllDialogs())
        //dispatch(getMyPhoto(myId))
    },[dispatch])

    useEffect(() => {
        setUserProfile(profile)
    },[profile])

    useEffect(() => {
        setDialog(dialogs)
    },[dialogs])

    const getAllMessagesUser = (userId) => dispatch(getListMessages(userId))
    const handleSendMessage = (message,userId) => dispatch(sendMessage(message,userId))
    const getNewUserProfile = (userId) => dispatch(getProfile(userId))
    const handleDeleteMessage = (messageId,userId) => dispatch(deleteMessage(messageId,userId))
    const handleMessageSpam = (messageId,userId) => dispatch(messageToSpamTC(messageId,userId))

    const handleSearchDialog = (dialogName) => {
        if (dialogName.length){
            setDialog(() => { return dialogs
                .filter(d => d.userName.toLowerCase().match(dialogName.toLowerCase())
                )
            })
        } else {
            setDialog(dialogs)
        }
    }



    return <>

        {isFetching
        ? <Preloader/>:null}
        <Dialogs dialogs={dialogs} getAllMessagesUser={getAllMessagesUser} messages={messages}
         handleSendMessage={handleSendMessage} getNewUserProfile={getNewUserProfile} userProfile={userProfile}
                 myId={myId} myPhoto={myPhoto} login={login} handleDeleteMessage={handleDeleteMessage}
                 newMessagesCount={newMessagesCount} handleSearchDialog={handleSearchDialog} localDialogs={localDialogs}
                 handleMessageSpam={handleMessageSpam} spam={spam}
        />

        </>
}

export default compose(withAuthRedirect)(DialogsContainer)