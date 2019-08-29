import constants from '../constants'

const auth = { isAuthenticated: false, user: null }

const initState = {
  user: null,
  authUser: auth.user,
  isAuthenticated: auth.isAuthenticated,
}

export default (state = initState, { type, payload }) => {
  switch (type) {
    case constants.auth.LOGIN_SUCCESS: {
      return {
        ...state,
        user: payload.user,
        authUser: payload.user,
        isAuthenticated: true
      }
    }

    case constants.auth.LOGOUT_SUCCESS: {
      return initState
    }

    default: {
      return state
    }
  }
}
