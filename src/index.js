import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import memoryUtils from './utils/memoryUtils'
import storageUtils from './utils/storageUtils'

const user = storageUtils.readUser()
memoryUtils.user = user

ReactDOM.render(<BrowserRouter>
    <App />
</BrowserRouter>, document.getElementById('root'))

