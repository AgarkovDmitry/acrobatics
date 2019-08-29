import { all, call, put, takeLatest } from 'redux-saga/effects'
import { push } from 'connected-react-router'

import * as firebase from '../../firebase'

import actions from '../actions'
import constants from '../constants'

export function* login(action) {
  try {
    const user = yield call(
      firebase.signIn,
      action.payload.email,
      action.payload.password
    )

    yield put(actions.auth.loginSuccess(user))
    yield put(push('/admin'))
  } catch (error) {
    console.error(error)
  }
}

export function* logout(action) {
  try {
    yield call(firebase.signOut)
    yield put(actions.auth.logoutSuccess())
    yield put(push('/login'))
  } catch (error) {
    console.error(error)
  }
}

function* watchLogin() {
  yield takeLatest(constants.auth.LOGIN, login)
}

function* watchLogout() {
  yield takeLatest(constants.auth.LOGOUT, logout)
}

export default function*() {
  yield all([
    watchLogin(),
    watchLogout(),
  ])
}
