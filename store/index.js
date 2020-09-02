export const state = () => {
    return {
        // current login user
        loginUser: null
    }
}

export const mutations = {
    set_login_user(state, user) {
        state.loginUser = user
    }
}