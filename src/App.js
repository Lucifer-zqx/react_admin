import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import 'antd/dist/antd.less'
import Home from './pages/home'
import Login from './pages/login'

export default class App extends Component {
    render() {
        return (
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/" component={Home} />               
            </Switch>
        )
    }
}
