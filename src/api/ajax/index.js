
//封装各个接口的请求方式

import ajax from './axios'

//登录接口
export const reqLogin = (username,password) => ajax('/login',{username,password},'POST')

//添加用户接口
export const reqAddUser= data => ajax('/manage/user/add',data,'POST')

