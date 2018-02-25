import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './CombineReducers';
import rootSaga from './CombineSagas';

const sagaMiddleware = createSagaMiddleware();
const env = process.env.NODE_ENV;

export function configureStore (initialState) {
  let store;
  if (env === 'production') {
    store = createStore(
      rootReducer,
      initialState,
      composeWithDevTools(
        applyMiddleware(sagaMiddleware),
      ),
    );
  } else {
    store = createStore(
      rootReducer,
      initialState,
      composeWithDevTools(
        applyMiddleware(sagaMiddleware),
        applyMiddleware(createLogger({ collapsed: true })),
      ),
    );
  }

  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
}
