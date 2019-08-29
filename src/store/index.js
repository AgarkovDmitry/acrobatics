import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'

import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'

// import authenticationMiddleware from './middlewares/authentication'

import reducer from './reducers'
import saga from './sagas'

const history = createBrowserHistory()

const composeEnhancers =
  (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      trace: true,
      traceLimit: 25,
    })) ||
  compose

const sagaMiddleware = createSagaMiddleware()

const middlewares = applyMiddleware(
  // authenticationMiddleware,
  sagaMiddleware,
  routerMiddleware(history)
)

const store = createStore(
  reducer(history),
  composeEnhancers(middlewares)
)

sagaMiddleware.run(saga)

export { history }

export default store
