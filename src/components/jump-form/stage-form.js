import React from 'react'
import { useForm, useField } from 'react-final-form-hooks'

import MenuItem from '@material-ui/core/MenuItem'

import ListItem from '@material-ui/core/ListItem'
import HighlightOff from '@material-ui/icons/HighlightOff'

import TextInput from './text-input'
import Select from './select'

import classes from './styles.module.css'

const flightPositions = [
  { id: 0, shortName: '', text: 'Прямо' },
  { id: 1, shortName: 'г', text: 'Группировка' },
  { id: 2, shortName: 'с', text: 'Складка' },
  { id: 3, shortName: 'св', text: 'Розножка' },
  { id: 4, shortName: 'п', text: 'Прогиб' }
]

const stageTypes = [
  { id: '', text: '' },
  { id: 'CHANGE_POSITION', text: 'Смена положения' },
  { id: 'FLIP_ROTATION', text: 'Сальтовое вращение' },
  { id: 'HELIX_ROTATION', text: 'Винтовое вращение' },
  { id: 'LATERAL_ROTATION', text: 'Боковое вращение' },
]

export default ({ stage, id, removeStage, updateStage }) => {
  const { form, values } = useForm({
    onSubmit: () => {},
    initialValues: {
      type: stage.type,
      value: stage.value
    }
  })

  const type = useField('type', form)
  const value = useField('value', form)

  React.useEffect(() => {
    form.change('value', 0)
  }, [form, values.type])

  const onTypeChange = (e) => {
    updateStage(id, { ...stage, type: e.target.value })
    type.input.onChange(e)
  }
  
  const onValueChange = (e) => {
    updateStage(id, { ...stage, value: e.target.value })
    value.input.onChange(e)
  }

  // console.log(stage)

  // React.useEffect(() => {
  //   updateStage(id, { type: values.type })
  // }, [id, values.type, updateStage])

  return (
    <ListItem className={ classes.stageBlock }>
      <Select field={type} label='Тип стадии' className={ classes.medControl } onChange={onTypeChange}>
        {
          stageTypes.map(({ id, text }) => (
            <MenuItem value={id} key={id}>{ text }</MenuItem>
          ))
        }
      </Select>
      {
        values.type === 'CHANGE_POSITION' && <Select field={value} label='Новая положение' className={ classes.medControl } onChange={onValueChange}>
          {
            flightPositions.map(({ id, text }) => (
              <MenuItem value={id} key={id}>{ text }</MenuItem>
            ))
          }
        </Select>
      }
      {
        values.type === 'FLIP_ROTATION' && <TextInput field={value} label='Количество сальтовых четвертей' className={ classes.medControl } onChange={onValueChange}/>
      }
      {
        values.type === 'HELIX_ROTATION' && <TextInput field={value} label='Количество винтовых половин' className={ classes.medControl } onChange={onValueChange}/>
      }
      {
        values.type === 'LATERAL_ROTATION' && <TextInput field={value} label='Количество боковых половин' className={ classes.medControl } onChange={onValueChange}/>
      }
      <div className={ classes.clickableIcon }>
        <HighlightOff onClick={() => removeStage(id) }/>
      </div>
    </ListItem>
  )
}
