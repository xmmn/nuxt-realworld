import { request } from '@/plugins/request.js'

// 登录
export function login(user) {
    return request.post('/api/users/login', {
        user
    })
}

export function register(user) {
    return request.post('/api/users', {
        user
    })
}

// 更新用户信息
export function updateUser(user) {
    return request.put('/api/user', { user })
}