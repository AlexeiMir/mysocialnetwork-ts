import React, {useEffect, useState} from 'react'
import Dialogs from "./Dialogs";
import {useDispatch, useSelector} from "react-redux";
import {deleteMessage, getAllDialogs, getListMessages, messageToSpamTC, sendMessage} from "../../redux/dialogs-reducer";
import Preloader from "../common/Preloader";
import {getProfile} from "../../redux/profile-reducer"
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {reset} from "redux-form";
import {getAutorizaionedUserId, selectCurrentUserLogin, selectMyPhoto} from '../../redux/auth-selectors';
import {getProfileSelector} from '../../redux/profile-selectors';
import {
    getDialogsSelector,
    getIsFetchingSelector,
    getMessagesSelector,
    getSpamSelector,
    selectNewMessagesCount
} from '../../redux/dialogs-selectors';


const DialogsContainer = () => {
    const dialogs = useSelector(getDialogsSelector)
    const messages = useSelector(getMessagesSelector)
    const isFetching = useSelector(getIsFetchingSelector)
    const newMessagesCount = useSelector(selectNewMessagesCount)
    const spam = useSelector(getSpamSelector)
    const profile = useSelector(getProfileSelector)
    const myId = useSelector(getAutorizaionedUserId)
    const myPhoto = useSelector(selectMyPhoto)
    const login = useSelector(selectCurrentUserLogin)

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

    const getAllMessagesUser = (userId:number) => dispatch(getListMessages(userId))
    const handleSendMessage = (message:string,userId:number) => {
           dispatch(sendMessage(message,userId))
            dispatch(reset("send-message"))
       }
    const getNewUserProfile = (userId:number) => dispatch(getProfile(userId))
    const handleDeleteMessage = (messageId:string,userId:number) => dispatch(deleteMessage(messageId,userId))
    const handleMessageSpam = (messageId:string,userId:number) => dispatch(messageToSpamTC(messageId,userId))

    const handleSearchDialog = (dialogName:string) => {
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