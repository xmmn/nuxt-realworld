import { request } from '@/plugins/request.js'

// 获取文章列表
export function getAllArticles(data) {
    return request.get('/api/articles', {
        params: data
    })
}

// 获取关注的文章列表
export function getFeedArticles(data) {
    return request.get('/api/articles/feed', {
        params: data
    })
}

// 关注文章
export function favoriteArticle(slug) {
    return request.post(`/api/articles/${slug}/favorite`)
}

// 关注文章
export function unfavoriteArticle(slug) {
    return request.delete(`/api/articles/${slug}/favorite`)
}

// 获取文章详情
export function getArticle(slug) {
    return request.get(`/api/articles/${slug}`)
}

// 获取所有评论
export function getArticleComments(slug) {
    return request.get(`/api/articles/${slug}/comments`)
}

// 添加评论
export function addArticleComment(slug, body) {
    return request.post(`/api/articles/${slug}/comments`, {
        comment: {
            body
        }
    })
}

// 删除评论
export function deleteArticleComment(slug, id) {
    return request.delete(`/api/articles/${slug}/comments/${id}`)
}

// 添加文章
export function addArticle(data) {
    return request.post('/api/articles', data)
}
