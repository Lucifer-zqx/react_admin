import React, { Component } from 'react'
import { Menu, Icon } from 'antd'
import { Link ,withRouter} from 'react-router-dom'
import logo from "../../assets/imgs/logo.png"
import './index.less'
import menulist from '../../config'


const { SubMenu } = Menu;

class LeftNav extends Component {
    // 生成菜单
    generateMenuList = menulist => {
        return menulist.map(item => {
            const path = this.props.location.pathname
            if (!item.children) {
                return (

                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>


                )
            } else {
                const cItem = item.children.find(cItem => cItem.key === path)
                if(cItem){
                    this.openKey=item.key
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

        })
    }

    //如果放到后面再取openKey开始是没有值的，所以先放到类的属性上，需要时在取出该值！！！！
    UNSAFE_componentWillMount(){
        this.menulists = this.generateMenuList(menulist)
    }

    render() {
        const path = this.props.location.pathname
        
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
