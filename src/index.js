import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import memoryUtils from './utils/memoryUtils'
import storageUtils from './utils/storageUtils'
import store from './redux/store'


const user = storageUtils.readUser()
memoryUtils.user = user

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'))

