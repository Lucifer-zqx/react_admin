import React, { Component } from 'react'
import './index.less'
import memoryUtils from "../../utils/memoryUtils"
export default class ContentHeader extends Component {
    render() {
        return (
            <div className="content-header">
                <div className="content-header-top">
                    <span>欢迎 {memoryUtils.user.username}</span>
                    <a href="javascript:">退出</a>
                </div>
                <div className="content-header-bottom">
                    <div className="content-header-bottom-left">
                        <span>首页</span>
                    </div>
                    <div className="content-header-bottom-right">
                        <span>2021/7/8 21:58:00</span>
                        <img src="" alt="climate" />
                        <span>晴</span>
                    </div>
                </div>
            </div>
            
        )
    }
}
