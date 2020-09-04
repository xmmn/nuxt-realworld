import { request } from '@/plugins/request.js'

export function followUser(username) {
    return request.post(`/api/profiles/${username}/follow`)
}


export function unfollowUser(username) {
    return request.delete(`/api/profiles/${username}/follow`)
}

export function getProfile(username) {
    return request.get(`/api/profiles/${username}`)
}