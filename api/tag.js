import { request } from '@/plugins/request.js'

// 获取所有标签
export function getAllTags() {
    return request.get('/api/tags')
}