import { mapState } from 'vuex'
export default {
    computed: {
        ...mapState(['loginUser']),
        hasLogin() {
            return !!this.loginUser
        }
    },
}