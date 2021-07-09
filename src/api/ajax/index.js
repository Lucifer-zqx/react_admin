//封装各接口的请求
import ajax from './axios'

export const reqLogin = (username,password) => ajax('/login',{username,password},'POST')


export const reqAddUser = data => ajax('/manage/user/add',data,'POST')