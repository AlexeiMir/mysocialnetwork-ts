import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {sendMessage, startMessagesListening, stopMessagesListening} from '../../redux/chat-reducer';
import {AppStateType} from "../../redux/redux-store";



type ChatMessageType = {
    message:string
    photo: string
    userId: number
    userName: string
}

const ChatPage:React.FC = () => {
    return (
        <div>
            <Chat/>
        </div>
    );
};


const Chat:React.FC = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startMessagesListening())

        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])


    return (
        <div>
            <MessagesChat />
            <AddMessageChatForm />
        </div>
    );
};

const MessagesChat:React.FC<{}> = () => {
    const messages = useSelector((state:AppStateType) => state.chat.messages)


    return (

        <div style={{height:'400px', overflow: 'auto'}}>
            {messages.map((message, index) =>
                <MessageChat key={index} message={message}/>)}
        </div>
    );
};

 const MessageChat:React.FC<{message:ChatMessageType}> = ({message}) => {

    return (
        <div>
            <img src={message.photo} style={{width: '100px'}}/>{message.userName}
            <br/>
            {message.message}
            <hr/>
        </div>
    );
};

const AddMessageChatForm:React.FC<{  }> = () => {
    const [message, setMessage] = useState('')

    const status = useSelector((state:AppStateType) => state.chat.status)

    const dispatch = useDispatch()



    const sendChatMessageHandler = () => {
        if (!message) return
        dispatch(sendMessage(message))
        setMessage('')
    }
    return (
        <div>
            <div>
                <textarea onChange={(e) => setMessage(e.currentTarget.value) } value={message}></textarea>
            </div>
            <div>
                <button disabled={status !== 'ready'} onClick={sendChatMessageHandler}>send</button>
            </div>

        </div>
    );
};

export default ChatPage;
