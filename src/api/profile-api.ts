import {instance} from "./api";

export const profileAPI = {
    getProfile(userId) {
        return instance.get(`profile/${userId}`)
    },
    updateProfile(profile) {

        return instance.put('profile', profile)
    },
    updateStatus(status) {
        return instance.put('profile/status', {status})
    },
    getStatus(userId) {
        return instance.get(`profile/status/${userId}`)
    },
    updatePhoto(photo) {
        let formData = new FormData();
        formData.append("photos", photo);
        return instance.put('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
}