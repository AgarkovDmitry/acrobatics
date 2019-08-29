import constants from '../constants'

export const login = ({ email, password }) => ({
  type: constants.auth.LOGIN,
  payload: { email, password }
})

export const logout = () => ({
  type: constants.auth.LOGOUT
})

// saga internal actions

export const loginSuccess = user => ({
  type: constants.auth.LOGIN_SUCCESS,
  payload: { user }
})

export const logoutSuccess = () => ({
  type: constants.auth.LOGOUT_SUCCESS
})
