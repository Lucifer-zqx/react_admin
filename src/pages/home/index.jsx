import React, { Component } from 'react'
import memoryUtils from '../../utils/memoryUtils'
export default class Home extends Component {
    render() {
        return (
            <div>
                hello  {memoryUtils.user.username} 
            </div>
        )
    }
}
