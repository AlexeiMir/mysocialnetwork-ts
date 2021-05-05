import {instance, GetItemsType, APIResponseType} from "./api";



export const usersAPI = {
    getUsers(currentPage=1, pageSize=10, searchedUser:string) {
        return instance.get<GetItemsType>(`users/?page=${currentPage}&count=${pageSize}`)
            .then(res => res.data)
    },
    searchUser(userName) {
        return instance.get<GetItemsType>(`users/?term=${userName}`)
    },
    follow(userId) {
        return instance.post<APIResponseType>(`follow/${userId}`)
    },
    unFollow(userId) {
        return instance.delete(`follow/${userId}`)
    }
}