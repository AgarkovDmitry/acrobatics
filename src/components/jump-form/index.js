import React from 'react'
import { useForm, useField } from 'react-final-form-hooks'

import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import AddCircleOutline from '@material-ui/icons/AddCircleOutline'

import TextInput from './text-input'
import Select from './select'
import StageForm from './stage-form'

import classes from './styles.module.css'

const positions = [
  { direction: 0, name: 'Ноги', id: 1 },
  { direction: 1, name: 'Живот', id: 2 },
  { direction: 3, name: 'Спина', id: 3 },
  { direction: 0, name: 'Cед', id: 4 },
  { direction: 0, name: 'Колени', id: 5 },
  { direction: 1, name: 'Четвереньки', id: 6 }
]

const flightPositions = [
  { id: 0, shortName: '', name: 'Прямо' },
  { id: 1, shortName: 'г', name: 'Группировка' },
  { id: 2, shortName: 'с', name: 'Складка' },
  { id: 3, shortName: 'св', name: 'Розножка' },
  { id: 4, shortName: 'п', name: 'Прогиб' }
]

const directions = [
  'Без изменения',
  'Вперед',
  'Назад'
]

const mod = (n, m) => ((n % m) + m) % m

const getStagesChange = (stages) => {
  const helixHalves = stages.filter(s => s.type === 'HELIX_ROTATION').reduce((res, item) => Number(item.value) + res, 0)
  const flipQuarters = stages.filter(s => s.type === 'FLIP_ROTATION').reduce((res, item) => Number(item.value) + res, 0)
  const flightPosition = (stages.find(s => s.type === 'CHANGE_POSITION') || { value: 0 }).value || 0

  return { helixHalves, flipQuarters, flightPosition }
}

const generateCode = ({ flipDirection, startPosition, finishPosition }, { helixHalves, flipQuarters, flightPosition }) => {
  return '' + 
    flipDirection + 
    startPosition + 
    (flipDirection === 1 ? 0 : flipQuarters) + 
    (helixHalves !== 0 ? helixHalves : '') +
    (finishPosition !== 1 && finishPosition !== 3 ? `-${finishPosition}` : '') + 
    (flightPosition !== 0 ? ` ${flightPositions.find(i => i.id === flightPosition).shortName}` : '')
}

const calculateDifficulty = ({ helixHalves, flipQuarters, flightPosition }) => {
  return Math.floor(
    1.25 * Number(flipQuarters) + 
    Number(helixHalves) + 
    Number(flipQuarters > 3 && (flightPosition === 2 || flightPosition === 4))
  ) / 10
}

const getFinishDirection = ({ flipDirection, startPosition }, { helixHalves, flipQuarters }) => {
  const startDirection = positions[startPosition - 1].direction
  const convertedFlipDirection = (flipDirection % directions.length) - 1 // from [1, 2, 3] to [0, 1, -1]
  let finishDirection = mod(startDirection + convertedFlipDirection * flipQuarters, 4)

  if (finishDirection % 2 !== 0) {
    finishDirection = mod((finishDirection + 2 * helixHalves), 4)  
  }

  return finishDirection
}

export default () => {
  const [stages, setStages] = React.useState([])

  const onSubmit = values => {
    console.log(values, stages)
  }

  const { form, values, handleSubmit, valid } = useForm({
    onSubmit,
    initialValues: {
      code: '110',
      startPosition: 1,
      finishPosition: 1,
      flipDirection: 1,
      difficulty: 0,
    }
  })

  const fullName = useField('fullName', form)
  const shortName = useField('shortName', form)
  const code = useField('code', form)
  const startPosition = useField('startPosition', form)
  const finishPosition = useField('finishPosition', form)
  const flipDirection = useField('flipDirection', form)
  const difficulty = useField('difficulty', form)

  const createStage = () => setStages((stages) => [...stages, { type: '', value: '' }])
  
  const removeStage = (id) => setStages((stages) => stages.filter((stage, index) => index !== id))

  const updateStage = (id, newStage) => setStages((stages) => stages.map((item, index) => index !== id ? item : { ...item, ...newStage }))

  const stagesChange = React.useMemo(
    () => getStagesChange(stages),
    [stages]
  )

  const finishDirection = React.useMemo(
    () => getFinishDirection({
      flipDirection: values.flipDirection,
      startPosition: values.startPosition,
    }, stagesChange),
    [values.flipDirection, values.startPosition, stagesChange]
  )

  const newDifficulty = React.useMemo(
    () => calculateDifficulty(stagesChange),
    [stagesChange]
  )

  const newCode = React.useMemo(
    () => generateCode({
      flipDirection: values.flipDirection,
      startPosition: values.startPosition,
      finishPosition: values.finishPosition,
    }, stagesChange),
    [values.flipDirection, values.startPosition, values.finishPosition, stagesChange]
  )

  const finishPositions = positions.filter(i => i.direction === finishDirection)

  React.useEffect(() => {
    const id = finishDirection !== 2 ? positions.find(p => p.direction === finishDirection).id : 0
  
    form.change('finishPosition', id)
  }, [form, finishDirection])

  React.useEffect(() => {
    form.change('difficulty', newDifficulty)
  }, [form, newDifficulty])

  React.useEffect(() => {
    form.change('code', newCode)
  }, [form, newCode])

  return (
    <form className={ classes.form } onSubmit={handleSubmit}>
      <TextInput field={fullName} label='Название' className={ classes.longSection } required />
      <TextInput field={shortName} label='Сокращенно' className={ classes.shortSection } required />
      <Divider className={ classes.divider }/>
      <div className={ classes.formBody }>
        <div className={ classes.longSection }>
          
          <div className={ classes.stagesBlock }>
            <Typography> Стадии </Typography>
            <List className={classes.stagesList }>
              {
                stages.map((stage, index) => (
                  <StageForm stage={ stage } id={index} key={index} removeStage={removeStage} updateStage={updateStage}/>
                ))
              }
              <ListItem>
                <ListItemIcon onClick={ createStage } className={ classes.clickableIcon }>
                  <AddCircleOutline />
                </ListItemIcon>
              </ListItem>
            </List>
          </div>
        </div>
        <div className={ classes.shortSection }>
          <TextInput field={code} label='Код' className={ classes.fullControl } disabled />
          <TextInput field={difficulty} label='Сложность' className={ classes.fullControl } disabled />
          <Select field={flipDirection} label='Сальтовое направление' className={ classes.medControl }>
            {
              directions.map((name, index) => (
                <MenuItem value={index + 1} key={index}>{ name }</MenuItem>
              ))
            }
          </Select>
          <Select field={startPosition} label='Стартовая позиция' className={ classes.medControl }>
            {
              positions.map(({ name, id }) => (
                <MenuItem value={id} key={id}>{ name }</MenuItem>
              ))
            }
          </Select>
          <Select field={finishPosition} label='Конечная позиция' className={ classes.fullControl } disabled={ finishPositions.length === 1 }>
            {
              finishPositions.map(({ name, id }) => (
                <MenuItem value={id} key={id}>{ name }</MenuItem>
              ))
            }
          </Select>
        </div>
      </div>

      <Button
        type='submit'
        fullWidth
        variant='contained'
        color='primary'
        className={classes.submit}
        disabled={!valid}
      >
        Save
      </Button>
    </form>
  )
}
