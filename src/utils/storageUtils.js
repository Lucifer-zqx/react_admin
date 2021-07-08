import store from 'store'
const USER_KEY ='user_key'
export default {
    saveUser(user){
        // localStorage.setItem(USER_KEY,JSON.stringify(user))
        store.set(USER_KEY,user)
    },
    readUser(){
        // return JSON.parse(localStorage.getItem(USER_KEY) || '{}')
        return store.get(USER_KEY) || {}
    },
    deleteUser(){
        // localStorage.removeItem(USER_KEY)
        store.remove(USER_KEY)
    }
}