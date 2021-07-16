import React, { Component } from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import AddUpdate from './add-update'
import ProductDetail from './detail'
import Home from './home'
import './product.less'
export default class Product extends Component {
    render() {
        return (
            <Switch>
                <Route path='/product' component={Home} exact/>
                <Route path='/product/addupdate' component={AddUpdate} />
                <Route path='/product/detail' component={ProductDetail} />
                <Redirect to='/product' />
            </Switch>
        )
    }
}
