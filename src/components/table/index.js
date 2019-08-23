import React from 'react'
import classnames from 'classnames'

import { combos } from '../../data/programm'

import classes from './styles.module.css'

const levels = [
  'Базовий', 'Початковий', 'Аматор', 'Досвідчений', 'Професіонал'
]

const backgrounds = [
  classes.greenBg,
  classes.blueBg,
  classes.purpleBg,
  classes.orangeBg,
  classes.redBg
]

export default function ComboTable ({}) {
  return (
    <div className={ classes.table }>
      {
        combos.map((combo, index) => (
          <div className={ classes.rowWrap }>
            <div className={ classnames(classes.row, backgrounds[combo.level]) }>
              <div className={ classes.leftSection }>
                <div className={ classes.indexSection }>
                  { index + 1 }.
                </div>
                <div>
                  Комбiнацiя "{ combo.name }"
                </div>
              </div>
              <div>
                { levels[combo.level] }
                { ' ' }
                {
                  combos
                    .filter(i => i.level === combo.level)
                    .findIndex(el => el.name === combo.name) + 1 
                }
              </div>
            </div>
            <div className={ classes.subRow }>
              <div>
                Коефіцієнт - { combo.coefficient }
              </div>
            </div>
          </div>
        ))
      }
    </div>
  )
}