import React, { Component } from 'react'
import { Menu, Icon } from 'antd'
import { Link, withRouter } from 'react-router-dom'
import logo from "../../assets/imgs/logo.png"
import './index.less'
import menulist from '../../config'
import memoryUtils from '../../utils/memoryUtils'


const { SubMenu } = Menu;

class LeftNav extends Component {
    // 生成菜单
    generateMenuList = menulist => {
        return menulist.map(item => {
            const path = this.props.location.pathname

            if(this.hasAuthor(item)){
                if (!item.children) {
                    
                        return (
                            <Menu.Item key={item.key}>
                                <Link to={item.key}>
                                    <Icon type={item.icon} />
                                    <span>{item.title}</span>
                                </Link>
                            </Menu.Item>)
                    
    
                } else {
                    //解决子路由不匹配，菜单关闭的问题
                    const cItem = item.children.find(cItem => path.indexOf(cItem.key) === 0)
                    if (cItem) {
                        this.openKey = item.key
                    }
                   
                        return (
                            <SubMenu
                                key={item.key}
                                title={
                                    <span>
                                        <Icon type={item.icon} />
                                        <span>{item.title}</span>
                                    </span>
                                }
                            >
                                {this.generateMenuList(item.children)}
                            </SubMenu>
                        )
                    
                }
            }

        })
    }

    //鉴权函数
    hasAuthor = item => {
        const { role, username } = memoryUtils.user
        const menus = role.menus
        //1.如果用户名为admin那么拥有全部权限
        //2.如果是有公用页面标志，直接获取该页面权限
        //3.如果item的key在role数组中，就渲染
        if (username === 'admin' || item.isPublic || menus.indexOf(item.key) !==-1) {
            return true
        }else if (item.children){
            //4.如果用户有某类的子权限
            return !!item.children.find(child => menus.indexOf(child.key) !== -1)
        }

        return false
            
       
    }

    //如果放到后面再取openKey开始是没有值的，所以先放到类的属性上，需要时在取出该值！！！！
    UNSAFE_componentWillMount() {
        this.menulists = this.generateMenuList(menulist)
    }

    render() {
        let path = this.props.location.pathname
        //解决子路由不匹配，菜单关闭的问题
        if (path.indexOf('/product') === 0) {
            path = '/product'
        }
        return (

            <div className='left-nav'>
                {/* 导航栏头部 */}
                <Link to='/home' >
                    <div className="left-nav-header">
                        <img src={logo} alt="logo" />
                        <h1>硅谷后台</h1>
                    </div>
                </Link>

                {/* 导航栏菜单项 */}
                <Menu
                    selectedKeys={[path]}
                    defaultOpenKeys={[this.openKey]}
                    mode="inline"
                    theme="dark"
                    style={{ marginTop: '-5px' }}
                >
                    {/* jsx可以是一个数组 */}
                    {
                        this.menulists
                    }
                </Menu>
            </div>



        )
    }
}

export default withRouter(LeftNav)
