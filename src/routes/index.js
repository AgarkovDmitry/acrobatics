import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { StylesProvider } from '@material-ui/styles'

import Home from './home'
import Login from './login'
import Admin from './admin'

// import { useActions } from '../store/actions'

import classes from './styles.module.css'

function App() {
  // const actions = useActions()
  // const token = readAuthFromCookies()

  // if (token) {
  //   actions.auth.verifyToken(token)
  // }

  return (
    <StylesProvider injectFirst>
      <div className={ classes.app }>
        <div className={ classes.appWrap }>
          <Switch>
            <Route path='/' exact component={ Home } />
            <Route path='/admin' exact component={ Admin } />
            <Route path='/login' exact component={ Login } />
          </Switch>
        </div>
      </div>
    </StylesProvider>
  )
}

export default App
