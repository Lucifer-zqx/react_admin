import { SET_HEAD_TITLE, GET_USER, RESET_USER } from './action_type'
import { reqLogin } from '../api/ajax'
import { message } from 'antd'
import store from '../utils/storageUtils'
export const setHeadTitle = data => ({ type: SET_HEAD_TITLE, data })

/**登录的同步action */
const login_user_creator = user => ({ type: GET_USER, user })

/**退出的同步action */
export const logout = () => {
    //删除localstorage的user
    store.deleteUser()
    //重置状态的user
    return { type: RESET_USER }
}
/**异步登录action——creator */
export const login = (username, password) => {
    return async dispatch => {
        const result = await reqLogin(username, password)
        if (result.status === 0) {
            const user = result.data
            //登陆成功
            //1.管理状态
            dispatch(login_user_creator(user))

            //2.操作localstorage
            store.saveUser(user)
        } else {
            message.error(result.msg)
        }
    }

}