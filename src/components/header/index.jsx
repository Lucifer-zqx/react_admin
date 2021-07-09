import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Modal } from 'antd'
import './index.less'
import LinkButton from '../link-button'
import memoryUtils from "../../utils/memoryUtils"
import storageUtils from "../../utils/storageUtils"
import { reqWeather } from '../../api/ajax'
import tansformDate from '../../utils/dateUtils'
import menuConfig from "../../config"

class ContentHeader extends Component {
    state = {
        currentTime: tansformDate(Date.now()),
        weather: ''
    }

    getWeather = async () => {
        const result = await reqWeather('合肥')
        if (result.info === 'OK') {
            const { lives } = result
            this.setState({ weather: lives[0].weather })
        }
    }

    getTitle = ()=>{
        let title 
        const pathname = this.props.location.pathname
        menuConfig.forEach(Item =>{
            if(Item.key === pathname){
                title = Item.title
            }else if(Item.children){
                const cItem = Item.children.find(cItem => cItem.key === pathname)
                console.log(cItem)
                title = cItem.title
            }

        })
        return title
    }


    //退出
    logout = () => {
        Modal.confirm({
           
            content: '确认退出吗？',
            onOk : () => {
                storageUtils.deleteUser()
                memoryUtils.user = {}
                this.props.history.replace('/login')
            }
            
        })
    }

    componentDidMount() {
        this.Timer = setInterval(async () => {
            this.setState({ currentTime: tansformDate(Date.now()) })
        }, 1000)
        this.getWeather()
       
    }
    
    componentWillUnmount(){
        clearInterval(this.Timer)
    }

    render() {
        const title = this.getTitle()
        return (
            <div className="content-header">
                <div className="content-header-top">
                    <span>欢迎 {memoryUtils.user.username}</span>
                    <LinkButton onClick={this.logout} >退出</LinkButton>
                </div>
                <div className="content-header-bottom">
                    <div className="content-header-bottom-left">
                        <span>{this.title}</span>
                    </div>
                    <div className="content-header-bottom-right">
                        <span>{this.state.currentTime}</span>
                        <img src="" alt="" />
                        <span>{this.state.weather}</span>
                    </div>
                </div>
            </div>

        )
    }
}
export default withRouter(ContentHeader)
