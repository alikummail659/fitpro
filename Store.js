import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'


import App from './App'

export default function Store(){

    return(
        <Provider store={store}>
        <App />
      </Provider>
    )
}
  
