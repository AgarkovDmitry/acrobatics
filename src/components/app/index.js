import React from 'react'

import Table from '../table'

import classes from './styles.module.css'

function App() {
  return (
    <div className={ classes.app }>
      <div className={ classes.appWrap }>
        <Table />
      </div>
    </div>
  )
}

export default App
