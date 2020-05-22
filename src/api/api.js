import * as axios from 'axios'

const instance = axios.create({
    withCredentials:true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {'API-KEY': '8a32d348-6f9e-451a-b238-e010eb3eea31'}
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

export const profileAPI = {
    getProfile(userId){
        return instance.get(`profile/${userId}`)
    },
    updateProfile(profile){
        return instance.put('profile',{profile})
    },
    updateStatus(status){
        return instance.put('profile/status',{status})
    },
    getStatus(userId){
        return instance.get(`profile/status/${userId}`)
    },
    updatePhoto(photo){
        let formData = new FormData();
        formData.append("photos", photo);
        return instance.put('profile/photo',formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
}