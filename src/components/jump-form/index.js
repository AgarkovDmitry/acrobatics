import React from 'react'
import { useForm, useField } from 'react-final-form-hooks'

import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

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
  { id: 0, shortName: ' ', name: 'Произвольно' },
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

const generateCode = ({ flipDirection, startPosition, flipQuarters, twistHalves, finishPosition, flightPosition }) => '' + 
  flipDirection + 
  startPosition + 
  (flipDirection === 1 ? 0 : flipQuarters) + 
  (twistHalves !== 0 ? twistHalves : '') +
  (finishPosition !== 1 && finishPosition !== 3 ? `-${finishPosition}` : '') + 
  (flightPosition !== 0 && ` ${flightPositions.find(i => i.id === flightPosition).shortName}`)

const calculateDifficulty = ({ flipQuarters, twistHalves, flightPosition }) => {
  return Math.floor(
    1.25 * Number(flipQuarters) + 
    Number(twistHalves) + 
    Number(flipQuarters > 3 && (flightPosition === 2 || flightPosition === 4))
  ) / 10
}

const getFinishDirection = ({ flipDirection, startPosition, flipQuarters, twistHalves }) => {
  const startDirection = positions[startPosition - 1].direction
  const convertedFlipDirection = (flipDirection % directions.length) - 1 // from [1, 2, 3] to [0, 1, -1]
  let finishDirection = mod(startDirection + convertedFlipDirection * flipQuarters, 4)

  if (finishDirection % 2 !== 0) {
    finishDirection = mod((finishDirection + 2 * twistHalves), 4)  
  }

  return finishDirection
}

export default () => {
  const onSubmit = values => {
    console.log(values)
  }

  const { form, values, handleSubmit, valid } = useForm({
    onSubmit,
    initialValues: {
      code: '110',
      startPosition: 1,
      finishPosition: 1,
      flipDirection: 1,
      flipQuarters: 0,
      twistHalves: 0,
      difficulty: 0,
      flightPosition: 0
    }
  })

  const fullName = useField('fullName', form)
  const shortName = useField('shortName', form)
  const code = useField('code', form)
  const startPosition = useField('startPosition', form)
  const finishPosition = useField('finishPosition', form)
  const flipDirection = useField('flipDirection', form)
  const flipQuarters = useField('flipQuarters', form)
  const twistHalves = useField('twistHalves', form)
  const difficulty = useField('difficulty', form)
  const flightPosition = useField('flightPosition', form)

  const finishDirection = getFinishDirection(values)
  const finishPositions = positions.filter(i => i.direction === finishDirection)

  const onChange = (key, shouldFinishPositionBeRecalculated) => e => {
    const updatedValues = { ...values, [key]: e.target.value }

    let id = updatedValues.finishPosition
  
    if (shouldFinishPositionBeRecalculated) {
      const direction = getFinishDirection(updatedValues)
      /* We can't jump on hands, so there is no positions for direction, which equals 2 */
      id = direction !== 2 ? positions.find(p => p.direction === direction).id : 0
      form.change('finishPosition', id)
    }

    if (shouldFinishPositionBeRecalculated) {
      const difficulty = calculateDifficulty(updatedValues)
      form.change('difficulty', difficulty)
    }
  
    const newCode = generateCode({ ...updatedValues, finishPosition: id })
    form.change('code', newCode)
    form.change(key, e.target.value)
  }

  const onStartPositionChange = (e) => {
    onChange('startPosition', true)(e)
  }

  const onFinishPositionChange = (e) => {
    onChange('finishPosition')(e)
  }

  const onFlipDirectionChange = (e) => {
    onChange('flipDirection', true)(e)
    
    if(e.target.value === 1) {
      form.change('flipQuarters', 0)
    }
  }

  const onFlipQuatersChange = (e) => {
    onChange('flipQuarters', true)(e)
  }

  const onTwistHalvesChange = (e) => {
    onChange('twistHalves', true)(e)
  }

  const onFlightPositionChange = (e) => {
    onChange('flightPosition', true)(e)
  }

  return (
    <form className={ classes.form } onSubmit={handleSubmit}>
      <FormControl className={ classes.longControl } required>
        <InputLabel htmlFor='fullName'>Название</InputLabel>
        <Input name='fullName' {...fullName.input} />
        {fullName.meta.error && fullName.meta.touched && (
          <Typography>{fullName.meta.error}</Typography>
        )}
      </FormControl>
      <FormControl className={ classes.shortControl } required>
        <InputLabel htmlFor='shortName'>Сокращенно</InputLabel>
        <Input name='shortName' {...shortName.input} />
        {shortName.meta.error && shortName.meta.touched && (
          <Typography>{shortName.meta.error}</Typography>
        )}
      </FormControl>
      <Divider className={ classes.divider }/>
      <FormControl className={ classes.shortControl }>
        <InputLabel htmlFor='startPosition'>Стартовая позиция</InputLabel>
        <Select {...startPosition.input} onChange={onStartPositionChange}>
          {
            positions.map(({ name, id }) => (
              <MenuItem value={id} key={id}>{ name }</MenuItem>
            ))
          }
        </Select>
        {startPosition.meta.error && startPosition.meta.touched && (
          <Typography>{startPosition.meta.error}</Typography>
        )}
      </FormControl>
      <FormControl className={ classes.shortControl }>
        <InputLabel htmlFor='finishPosition'>Конечная позиция</InputLabel>
        <Select {...finishPosition.input} disabled={ finishPositions.length === 1 } onChange={onFinishPositionChange}>
          {
            finishPositions
            .map(({ name, id }) => (
              <MenuItem value={id} key={id}>{ name }</MenuItem>
            ))
          }
        </Select>
        {finishPosition.meta.error && finishPosition.meta.touched && (
          <Typography>{finishPosition.meta.error}</Typography>
        )}
      </FormControl>
      <FormControl className={ classes.shortControl }>
        <InputLabel htmlFor='code'>Код</InputLabel>
        <Input {...code.input} disabled={ true } />
        {code.meta.error && code.meta.touched && (
          <Typography>{code.meta.error}</Typography>
        )}
      </FormControl>
      <FormControl className={ classes.shortControl }>
        <InputLabel htmlFor='flipDirection'>Сальтовое направление</InputLabel>
        <Select {...flipDirection.input} onChange={onFlipDirectionChange}>
          {
            directions.map((name, index) => (
              <MenuItem value={index + 1} key={index}>{ name }</MenuItem>
            ))
          }
        </Select>
        {flipDirection.meta.error && flipDirection.meta.touched && (
          <Typography>{flipDirection.meta.error}</Typography>
        )}
      </FormControl>
      <FormControl className={ classes.shortControl }>
        <InputLabel htmlFor='flipQuarters'>Количество сальтовых четвертей</InputLabel>
        <Input name='flipQuarters' {...flipQuarters.input} onChange={onFlipQuatersChange} disabled={values.flipDirection === 1}/>
        {flipQuarters.meta.error && flipQuarters.meta.touched && (
          <Typography>{flipQuarters.meta.error}</Typography>
        )}
      </FormControl>
      <FormControl className={ classes.shortControl }>
        <InputLabel htmlFor='difficulty'>Сложность</InputLabel>
        <Input name='difficulty' {...difficulty.input} disabled/>
        {difficulty.meta.error && difficulty.meta.touched && (
          <Typography>{difficulty.meta.error}</Typography>
        )}
      </FormControl>
      <FormControl className={ classes.shortControl }>
        <InputLabel htmlFor='twistHalves'>Количество винтовых половин</InputLabel>
        <Input name='twistHalves' {...twistHalves.input} onChange={ onTwistHalvesChange }/>
        {twistHalves.meta.error && twistHalves.meta.touched && (
          <Typography>{twistHalves.meta.error}</Typography>
        )}
      </FormControl>
      <FormControl className={ classes.shortControl }>
        <InputLabel htmlFor='flightPosition'>Промежуточная позиция</InputLabel>
        <Select {...flightPosition.input} onChange={onFlightPositionChange}>
          {
            flightPositions.map((pos, index) => (
              <MenuItem value={pos.id} key={index}>{ pos.name }</MenuItem>
            ))
          }
        </Select>
        {flightPosition.meta.error && flightPosition.meta.touched && (
          <Typography>{flightPosition.meta.error}</Typography>
        )}
      </FormControl>
      <Button
        type='submit'
        fullWidth
        variant='contained'
        color='primary'
        className={classes.submit}
        disabled={!valid}
      >
        Sign in
      </Button>
    </form>
  )
}
