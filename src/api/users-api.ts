import {instance, GetItemsType, APIResponseType} from "./api";



export const usersAPI = {
    getUsers(currentPage=1, pageSize=10, searchedUser:string) {
        return instance.get<GetItemsType>(`users/?page=${currentPage}&count=${pageSize}`)
            .then(res => res.data)
    },
    searchUser(userName) {
        return instance.get<GetItemsType>(`users/?term=${userName}`).then(res => res.data)
    },
    follow(userId) {
        return instance.post<APIResponseType>(`follow/${userId}`).then(res => res.data)
    },
    unFollow(userId) {
        return instance.delete(`follow/${userId}`).then(res => res.data) as Promise<APIResponseType>
    }
}