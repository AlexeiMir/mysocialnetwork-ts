import {instance, APIResponseType} from "./api";
import {ProfileType, PhotosType} from '../types/types'

type SavePhotoResponseDataType = {
    photos: PhotosType
}

export const profileAPI = {
    getProfile(userId) {
        return instance.get<ProfileType>(`profile/${userId}`).then(res => res.data)
    },
    updateProfile(profile) {

        return instance.put<APIResponseType>('profile', profile).then(res => res.data)
    },
    updateStatus(status) {
        return instance.put<APIResponseType>('profile/status', {status}).then(res => res.data)
    },
    getStatus(userId) {
        return instance.get<string>(`profile/status/${userId}`).then(res => res.data)
    },
    updatePhoto(photo) {
        let formData = new FormData();
        formData.append("photos", photo);
        return instance.put<APIResponseType<SavePhotoResponseDataType>>('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => res.data)
    }
}