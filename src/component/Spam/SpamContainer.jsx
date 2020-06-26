import React from "react";
import Spam from "./Spam";
import {useDispatch, useSelector} from "react-redux";
import {restoreMessageFromSpam} from "../../redux/dialogs-reducer";


const SpamContainer = () => {
    const spam = useSelector(state => state.dialogsPage.spam)
    const profile = useSelector(state => state.profilePage.profile)
    const dispatch = useDispatch()

const handleRestoreMessage = (messageId) => {
        const userId = spam.find(sp => sp.id).senderId
        dispatch(restoreMessageFromSpam(messageId,userId))
}

    return <Spam spam={spam} handleRestoreMessage={handleRestoreMessage} profile={profile}/>
}

export default SpamContainer;