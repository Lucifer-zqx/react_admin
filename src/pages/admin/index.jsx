import React, { Component } from 'react'
import { Layout } from 'antd'
import {Switch,Route,Redirect} from 'react-router-dom'
import LeftNav from '../../components/left-nav'
import Header from '../../components/header'


import Home from '../home/home'
import Category from '../category/category'
import Role from '../role/role'
import Product from '../product/product'
import User from '../user/user'
import Pie from "../charts/pie"
import Line from "../charts/line"
import Bar from "../charts/bar"
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'

const { Footer, Sider, Content } = Layout


export default class Admin extends Component {
    render() {
        
        const storeUser = storageUtils.readUser()
        if(storeUser._id){
            memoryUtils.user=storeUser
        }else{
            this.props.history.replace('/login')
            return
        }
        return (
            <Layout style={{ minHeight: '100%' }}>
                <Sider className="left-nav">
                    <LeftNav />
                </Sider>
                <Layout>
                    <Header />
                    <Content style={{backgroundColor:"#fff", margin:"20px"}}>
                        <Switch>
                            <Route path="/home" component={Home}></Route>
                            <Route path="/category" component={Category}></Route>
                            <Route path="/user" component={User}></Route>
                            <Route path="/role" component={Role}></Route>
                            <Route path="/product" component={Product}></Route>
                            <Route path="/charts/pie" component={Pie}></Route>
                            <Route path="/charts/line" component={Line}></Route>
                            <Route path="/charts/bar" component={Bar}></Route>
                            <Redirect to="/home"></Redirect>
                        </Switch>
                    </Content>
                    <Footer style={{color:"#ccc",textAlign: "center" }}>
                        建议使用谷歌浏览器以获得更好的浏览体验
                    </Footer>
                </Layout>
            </Layout>
        )
    }
}
