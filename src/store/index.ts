import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { rootReducers } from '../reducers';
import { rootSaga } from '../sagas';
import { composeWithDevTools } from 'redux-devtools-extension';

const sagaMiddleware = createSagaMiddleware();
const middleware = applyMiddleware(sagaMiddleware);

const devTools =
  process.env.NODE_ENV === 'production' // eslint-disable-line no-undef
    ? middleware
    : composeWithDevTools(middleware);

export const store = createStore(rootReducers, {}, devTools);

sagaMiddleware.run(rootSaga);
