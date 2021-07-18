
//封装各个接口的请求方式

import ajax from './axios'
import jsonp from 'jsonp'
import { message } from 'antd'
const BASE_URL='/api'
//登录接口
export const reqLogin = (username, password) => ajax(BASE_URL+'/login', { username, password }, 'POST')


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
export const reqCategorys = parentId => ajax(BASE_URL+'/manage/category/list', { parentId })

//添加分类列表
export const reqAddCategory = (parentId, categoryName) => ajax(BASE_URL+'/manage/category/add', { parentId, categoryName }, 'POST')

//更新分类列表
export const reqUpdateCategory = ({ categoryId, categoryName }) => ajax(BASE_URL+'/manage/category/update', { categoryId, categoryName }, 'POST')

//获取商品分页列表
export const reqProducts = (pageNum, pageSize) => ajax(BASE_URL+'/manage/product/list', { pageNum, pageSize })

//根据关键字查询分页列表
export const reqProductsByKeyword = ({ pageNum, pageSize, searchType, productKeyword }) => ajax(BASE_URL+'/manage/product/search',
    {
        pageNum,
        pageSize,
        [searchType]:productKeyword
    }
)

//根据分类Id查询分类信息
export const reqCategoryInfoById = (categoryId) => ajax(BASE_URL+"/manage/category/info",{categoryId})


//更新商品的状态（上下架）
export const reqUpdateStatus = (productId,status) => ajax(BASE_URL+'/manage/product/updateStatus',{productId,status},'POST')


//删除图片
export const reqDeleteImg = name => ajax(BASE_URL+'/manage/img/delete',{name},'POST')


//添加或更新商品
export const reqAddOrUpdateProduct = product => ajax(BASE_URL+'/manage/product/'+(product._id ? 'update':'add'),product,"POST")


//获取角色列表
export const reqRoles = () => ajax(BASE_URL+'/manage/role/list')

//添加角色
export const reqAddRole = ({roleName}) => ajax(BASE_URL+'/manage/role/add',{roleName},'POST')

//设置角色权限
export const reqUpdateAuthority = (role) => ajax(BASE_URL+'/manage/role/update',role,'POST')


//请求用户列表
export const reqUsers  = ()=> ajax(BASE_URL+'/manage/user/list')

//删除用户
export const reqDeleteUser = userId => ajax(BASE_URL+'/manage/user/delete',{userId},"POST")

//添加用户
export const reqAddUser = user => ajax(BASE_URL+'/manage/user/add',user,'POST')


//更新用户

export const reqUpdateUser = user => ajax(BASE_URL+'/manage/user/update',user,'POST')