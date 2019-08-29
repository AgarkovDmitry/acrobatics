import React from 'react'
import { useForm, useField } from 'react-final-form-hooks'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import { useActions } from '../../store/actions'

import classes from './styles.module.css'

import {
  passwordValidation,
  baseEmailValidation
} from '../../utils/validations'

export default () => {
  const actions = useActions()

  const onSubmit = values => {
    actions.auth.login(values)
  }

  const { form, handleSubmit, valid } = useForm({
    onSubmit
  })

  const email = useField('email', form, baseEmailValidation)
  const password = useField('password', form, passwordValidation)

  return (
    <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Log in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <FormControl margin='normal' required fullWidth>
            <InputLabel htmlFor='email'>Email Address</InputLabel>
            <Input
              id='email'
              name='email'
              autoComplete='email'
              autoFocus
              {...email.input}
            />
            {email.meta.error && email.meta.touched && (
              <Typography>{email.meta.error}</Typography>
            )}
          </FormControl>
          <FormControl margin='normal' required fullWidth>
            <InputLabel htmlFor='password'>Password</InputLabel>
            <Input
              name='password'
              type='password'
              id='password'
              autoComplete='current-password'
              {...password.input}
            />
            {password.meta.error && password.meta.touched && (
              <Typography>{password.meta.error}</Typography>
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
      </Paper>
    </main>
  )
}
