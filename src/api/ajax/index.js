
//封装各个接口的请求方式

import ajax from './axios'
import jsonp from 'jsonp'
import { message } from 'antd'

//登录接口
export const reqLogin = (username, password) => ajax('/login', { username, password }, 'POST')

//添加用户接口
export const reqAddUser = data => ajax('/manage/user/add', data, 'POST')

//天气预报接口
export const reqWeather = city => {
    return new Promise((resolve, reject) => {
        //发送jsonp请求
        jsonp(`https://restapi.amap.com/v3/weather/weatherInfo?key=31a9aec4d91cc32d2328e89b91c0c965&city=${city}`, {}, (err, data) => {
            if (!err) {
                resolve(data)
            } else {
                message.error('获取天气信息失败！')
            }
        })
    })
}

//查询分类列表
export  const reqCategorys = parentId => ajax('/manage/category/list',{parentId})

//添加分类列表
export const reqAddCategory = (parentId,categoryName) => ajax('/manage/category/add',{parentId,categoryName},'POST')

//更新分类列表
export const reqUpdateCategory = ({categoryId,categoryName}) => ajax('/manage/category/update',{categoryId,categoryName},'POST')





