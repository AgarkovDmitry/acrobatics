import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as auth from './auth'

const actions = {
  auth,
}

export default actions

export const useActions = () => {
  const dispatch = useDispatch()

  /* Typesafe binding actions for VS Code */
  const boundActions = useMemo(
    () => ({
      auth: bindActionCreators(actions.auth, dispatch),
    }),
    [dispatch]
  )

  return boundActions
}
