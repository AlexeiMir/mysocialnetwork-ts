import * as axios from 'axios'

const instance = axios.create({
    withCredentials:true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {'API-KEY': '1a662429-21c6-4d13-8c08-58bd3b8f0291'}
})

export const usersAPI = {
    getUsers(currentPage,pageSize){
        return instance.get(`users/?page=${pageSize}&count=${currentPage}`)
    },
    follow(userId){

        return instance.post(`follow/${userId}`)
    },
    unFollow(userId){
        return instance.delete(`follow/${userId}`)
    }
}

export const dialogsAPI = {
    /*     start chatting, refresh your companion so that he was on top
      */
    startChatting(userId) {
        return instance.put(`dialogs/${userId}`)
    },
    // get all dialogs
    getAllDialogs(){
        return instance.get(`dialogs`)
    },
    //get list of messages with your friend
    getListsMessages(userId) {
    return instance.get(`dialogs/${userId}/messages`)
    },
    //send message to your friend
    sendMessageToFriend(userId,message){
        return instance.post(`dialogs/${userId}/messages`,{message})
    }
}

export const authAPI ={
    me(){
        return instance.get('auth/me')
    },
    login(email,password,rememberMe,captcha=null){
        return instance.post('auth/login',{email,password,rememberMe,captcha})
    },
    logout(){
        return instance.delete('auth/login')
    }
}