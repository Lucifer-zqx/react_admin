import {combineReducers} from 'redux'
import {SET_HEAD_TITLE} from './action_type'

const initHead = '首页'
function setHeadTitle(state=initHead,action){
    switch (action.type){

        case SET_HEAD_TITLE:
            return action.data
        default:
            return state
    }
}

function user(state=0,action){
    switch (action.type){
        case SET_HEAD_TITLE:
            return action.data
        default:
            return state
    }
}

export default combineReducers({
    setHeadTitle,
    user
})