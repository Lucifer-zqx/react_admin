import {combineReducers} from 'redux'
import {SET_HEAD_TITLE,GET_USER, RESET_USER} from './action_type'
import store from '../utils/storageUtils'

const initHead = '首页'
function setHeadTitle(state=initHead,action){
    switch (action.type){
        case SET_HEAD_TITLE:
            return action.data
        default:
            return state
    }
}

const initUser = store.readUser()
function user(state=initUser,action){
    switch (action.type){
        case GET_USER:
            return action.user
        case RESET_USER:
            return {}
        default:
            return state
    }
}

export default combineReducers({
    setHeadTitle,
    user
})