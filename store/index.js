
const cookieParser = process.server ? require('cookieparser') : undefined;
const Cookie = process.client ? require('js-cookie') : undefined
export const state = () => {
    return {
        // current login user
        loginUser: null
    }
}

export const mutations = {
    set_login_user(state, user) {
        if (Cookie) {
            Cookie.set('user', user)
        }
        state.loginUser = user
    }
}

export const actions = {
    // 服务端初始化的时候会调用此固定名称方法
    nuxtServerInit({ commit }, { req }) {
        let user = null
        if (req && req.headers.cookie) {
            const parsed = cookieParser.parse(req.headers.cookie)
            
            try {
                user = JSON.parse(parsed.user)
            } catch (err) {
            }
        }
        commit('set_login_user', user)
    }
}