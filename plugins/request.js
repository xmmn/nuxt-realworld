import axios from 'axios'

export const request = axios.create({
    baseURL: 'http://realworld.api.fed.lagounews.com'
})

export default (context) => {
    request.interceptors.request.use(function (config) {
        const { loginUser } = context.store.state;
        if (loginUser && loginUser.token) {
            config.headers.authorization =
                `Token ${loginUser.token}`
        }

        return config;
    }, function (error) {
        return Promise.reject(error);
    });
};