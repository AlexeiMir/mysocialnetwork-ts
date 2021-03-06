import {instance, GetItemsType, APIResponseType} from "./api";
import {UserType} from "../types/types";



export const usersAPI = {
    getUsers(currentPage=1, pageSize=10, term:string='', friend: null|boolean=null) {
        return instance.get<GetItemsType<UserType>>(`users?page=${currentPage}&count=${pageSize}
        &term=${term}` + (friend === null ? '' : `&friend=${friend}`))
            .then(res => res.data)
    },
    searchUser(userName:string) {
        return instance.get<GetItemsType<UserType>>(`users/?term=${userName}`).then(res => res.data)
    },
    follow(userId:number) {
        return instance.post<APIResponseType>(`follow/${userId}`).then(res => res.data)
    },
    unFollow(userId:number) {
        return instance.delete(`follow/${userId}`).then(res => res.data) as Promise<APIResponseType>
    }
}