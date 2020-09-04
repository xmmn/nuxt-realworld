export default function ({ store, redirect }) {
    if (store.state.loginUser) {
        return redirect({
            name: 'home'
        })
    }
}