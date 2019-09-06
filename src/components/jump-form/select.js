import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import Typography from '@material-ui/core/Typography'

export default ({ field, label, required, disabled, onChange, className, children }) => {
  return (
    <FormControl className={ className } required={required}>
      <InputLabel>{label}</InputLabel>
      <Select {...field.input} disabled={disabled} onChange={ onChange || field.input.onChange}>
        {children}
      </Select>
      {field.meta.error && field.meta.touched && (
        <Typography>{field.meta.error}</Typography>
      )}
    </FormControl>
  )
}
