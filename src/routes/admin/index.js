import React from 'react'

import AppBar from '@material-ui/core/AppBar'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
// import { useSelector } from 'react-redux'
// import { Redirect } from 'react-router-dom'


import ComboRow from '../../components/combo-row'

import { combos, jumps } from '../../data/programm'

import classes from './styles.module.css'

export default function ComboTable () {
  const [value, setValue] = React.useState(0)

  function handleChange(event, newValue) {
    setValue(newValue)
  }
  // const user = useSelector(state => state.auth.user)
  
  // if (!user) {
  //   return (
  //     <Redirect to='/login' />
  //   )
  // }

  return (
    <div className={ classes.root }>
      <AppBar position='static' color='default'>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor='primary'
          textColor='primary'
          variant='scrollable'
          scrollButtons='auto'
          aria-label='scrollable auto tabs example'
        >
          <Tab label='Jumps' />
          <Tab label='Combinations' />
        </Tabs>
      </AppBar>

      <Paper className={ classes.paper }>
        {
          value === 0 && jumps.map((jump) => (
            <Typography> {jump.shortName} </Typography>
          ))
        }
        {
          value === 1 && combos.map((combo) => (
            <Typography> {combo.name} </Typography>
          ))
        }
      </Paper>
      
    </div>
  )
}