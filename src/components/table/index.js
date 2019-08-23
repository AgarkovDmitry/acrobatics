import React from 'react'

import ComboRow from '../combo-row'

import { combos } from '../../data/programm'

import classes from './styles.module.css'

export default function ComboTable () {
  return (
    <div className={ classes.table }>
      {
        combos.map((combo, index) => (
          <ComboRow combo={ combo } order={ index } key={ index }/>
        ))
      }
    </div>
  )
}