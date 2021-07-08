import React, { Component } from 'react'
import { Layout } from 'antd'
import './index.less'
const {Header} = Layout
export default class ContentHeader extends Component {
    render() {
        return (
            <div>
                <Header className='content-header'>Header</Header>
            </div>
            
        )
    }
}
