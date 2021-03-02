import { createWrapper, MakeStore } from 'next-redux-wrapper'
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './rootReducers'
import rootSaga from './rootSagas'

const makeStore: MakeStore<Store.RootState> = () => {
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))
  sagaMiddleware.run(rootSaga)
  return store
}
export const wrapper = createWrapper<Store.RootState>(makeStore)