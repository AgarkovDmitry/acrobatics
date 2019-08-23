import React from 'react'
import classnames from 'classnames'

import Hidden from '@material-ui/core/Hidden'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Collapse from '@material-ui/core/Collapse'
import ArrowDropUp from '@material-ui/icons/ArrowDropUp'
import ArrowDropDown from '@material-ui/icons/ArrowDropDown'

import { combos, jumps } from '../../data/programm'

import classes from './styles.module.css'

const backgrounds = [
  classes.greenBg,
  classes.blueBg,
  classes.purpleBg,
  classes.orangeBg,
  classes.redBg
]

const paleBackgrounds = [
  classes.paleGreenBg,
  classes.paleBlueBg,
  classes.palePurpleBg,
  classes.paleOrangeBg,
  classes.paleRedBg
]
const levels = [
  'Базовий', 'Початковий', 'Аматор', 'Досвідчений', 'Професіонал'
]

const comboToggleText = {
  false: 'Показати',
  true: 'Сховати'
}

const comboToggleIcon = {
  false: ArrowDropDown,
  true: ArrowDropUp
}

export default function ComboRow ({ combo, order }) {
  const [opened, setOpened] = React.useState(false)

  const toggleOpened = React.useCallback(() => {
    setOpened(!opened)
  }, [opened, setOpened])

  const elements = React.useMemo(() => {
    return combo.jumps.map(code => jumps.find(jump => jump.code === code))
  }, [combo])

  const difficulty = React.useMemo(() => {
    return elements.reduce((res, item) => res + item.difficulty, 0)
  }, [elements])

  const Icon = comboToggleIcon[opened]

  return (
    <div className={ classes.rowWrap }>
      <div className={ classnames(classes.row, backgrounds[combo.level]) }>
        <div className={ classes.leftSection }>
          <div className={ classes.indexSection }>
            { order + 1 }.
          </div>
          <div>
            Комбiнацiя "{ combo.name }"
          </div>
        </div>
        <Hidden mdDown={ true }>
          <div>
            { levels[combo.level] }
            { ' ' }
            {
              combos
                .filter(i => i.level === combo.level)
                .findIndex(el => el.name === combo.name) + 1 
            }
          </div>
        </Hidden>
      </div>
      <div className={ classes.subRow }>
        <div>
          Коефіцієнт - { combo.coefficient }
        </div>
        <div className={ classes.toggleBlock } onClick={ toggleOpened }>
          <div className={ classes.toggleText }>
            { comboToggleText[opened] }
          </div>
          <Icon />
        </div>
      </div>
      <Collapse
        in={ opened }
        timeout='auto'
        unmountOnExit
      >
        <Table>
          <TableHead>
            <TableRow className={ backgrounds[combo.level] }>
              <TableCell align='center' size='small' className={ classes.cell }/>
              <TableCell align='left' size='small' className={ classes.cell }>
                Елемент
              </TableCell>
              <Hidden mdDown={ true }>
                <TableCell align='left' size='small' className={ classes.cell }>
                  Скорочено
                </TableCell>
              </Hidden>
              <TableCell align='center' size='small' className={ classes.cell }>
                Код
              </TableCell>
              <TableCell align='center' size='small' className={ classes.cell }>
                Складність { difficulty }
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              elements.map((jump, index) => (
                <TableRow className={
                  classnames(
                    index % 2 === 0 ? paleBackgrounds[combo.level] : classes.paleBg
                  )
                } key={ index }>
                  <TableCell align='center' size='small'>
                    { index + 1 }
                  </TableCell>
                  <Hidden mdDown={ true }>
                    <TableCell align='left' size='small'>
                      { jump.longName }
                    </TableCell>
                  </Hidden>
                  <TableCell align='left' size='small'>
                    { jump.shortName }
                  </TableCell>
                  <TableCell align='center' size='small'>
                    { jump.code }
                  </TableCell>
                  <TableCell align='center' size='small'>
                    { jump.difficulty > 0 && jump.difficulty }
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </Collapse>
    </div>
  )
}