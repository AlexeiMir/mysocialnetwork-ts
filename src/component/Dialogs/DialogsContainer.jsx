import React, {useEffect} from 'react'
import Dialogs from "./Dialogs";
import {useDispatch, useSelector} from "react-redux";
import {getAllDialogs,getListMessages,sendMessage} from "../../redux/dialogs-reducer";
import Preloader from "../common/Preloader";


const DialogsContainer = () => {
    const dialogs = useSelector(state => state.dialogsPage.dialogs)
    const messages = useSelector(state => state.dialogsPage.messages)
    const isFetching = useSelector(state => state.dialogsPage.isFetching)
    
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllDialogs())
    },[dispatch])

    const handleListMessages = (userName) => dispatch(getListMessages(userName))
    const handleSendMessage = (message) => dispatch(sendMessage(message))


    return <>

        {isFetching
        ? <Preloader/>:null}
        <Dialogs dialogs={dialogs} handleListMessages={handleListMessages} messages={messages} handleSendMessage={handleSendMessage}/>

        </>
}

export default DialogsContainer