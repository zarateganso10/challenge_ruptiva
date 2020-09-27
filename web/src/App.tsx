import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import Provider from './hooks'

import Routes from './routes'

import GlobalStyle from './styles/global'

function App() {
  return (
    <Router>
      <Provider>
        <Routes />
      </Provider>

      <GlobalStyle />
    </Router>
  )
}

export default App
