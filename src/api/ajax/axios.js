
//创建axois两种请求
import { message } from 'antd'
import axios from 'axios'

export default function ajax(url, data = {}, method = "GET") {

    return new Promise((resolve, reject) => {
        //发ajax请求
        let promise
        if (method === "GET") {
            promise = axios.get(url, {
                params: data
            })
        } else {
            promise = axios.post(url, data)
        }
        //resolve将成功数据返回
        promise.then(response=>{
            //这里返回的是请求接口的成功与否，无业务无关
            resolve(response.data)
        }).catch(err=>{
            //ajax请求失败.显示错误信息
            message.error(err.message)
        })

        //失败将错误信息展示
    })


}
