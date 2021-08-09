
let subscribers = {
    'messages-received': [] as MessageReceivedSubscriberType[],
    'status-changed': StatusType
} 

let ws:WebSocket | null = null
type EventsNames = 'messages-received' | 'status-changed'

let closeHandler = () => {
    console.log('WS Close')
    setTimeout(createChannel,3000)
};

const messageHandler = (e:MessageEvent) => {
    debugger
    let newMessages = JSON.parse(e.data)
    subscribers.forEach(s => s(newMessages))
}

const cleanUp = () => {
    ws?.removeEventListener('close',closeHandler)
    ws?.removeEventListener('message', messageHandler)
}

function createChannel() {
    cleanUp()
    ws?.close()
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');

    ws?.addEventListener('close', closeHandler)
    ws?.addEventListener('message', messageHandler)
}


export const chatAPI = {
    start() {
        createChannel()
    },
    stop(){
        subscribers = []
        cleanUp()
        ws?.close()
    },
    subscribe(eventName: EventsNames, callback:MessageReceivedSubscriberType){
        subscribers.push(callback)
        return () => {
            subscribers = subscribers.filter(s => s != callback)
        }
    },
    unsubscribe(eventName: EventsNames, callback:MessageReceivedSubscriberType) {
        subscribers = subscribers.filter(s => s != callback)
    },
    sendMessage(message:string){
        debugger
        ws?.send(message)
    }

}

export type ChatMessageType = {
    message:string
    photo: string
    userId: number
    userName: string
}

export type StatusType = 'pending' | 'ready';

type MessageReceivedSubscriberType = (messages: ChatMessageType[]) => void
type StatusChangedSubscriberType = (status: StatusType) => void