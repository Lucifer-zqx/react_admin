import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import 'antd/dist/antd.less'
import Admin from './pages/admin'
import Login from './pages/login'

export default class App extends Component {
    render() {
        return (
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/" component={Admin} />               
            </Switch>
        )
    }
}
