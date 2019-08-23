import React from 'react'
import { StylesProvider } from '@material-ui/styles'

import Table from '../table'

import classes from './styles.module.css'

function App() {
  return (
    <StylesProvider injectFirst>
      <div className={ classes.app }>
        <div className={ classes.appWrap }>
          <Table />
        </div>
      </div>
    </StylesProvider>
  )
}

export default App
