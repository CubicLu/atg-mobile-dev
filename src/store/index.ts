import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { rootReducers } from '../reducers';
import { rootSaga } from '../sagas';
import { composeWithDevTools } from 'redux-devtools-extension';

const sagaMiddleware = createSagaMiddleware();

const middlewareEnhancer = applyMiddleware(sagaMiddleware);
const composedEnhancers = composeWithDevTools(...[middlewareEnhancer]);
export const store = createStore(rootReducers, {}, composedEnhancers);

sagaMiddleware.run(rootSaga);
