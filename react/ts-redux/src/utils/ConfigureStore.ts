import { createStore, applyMiddleware, compose, Middleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { History } from 'history';

import { rootReducer, RootState } from './../reducers';

declare var __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: <R>(a: R) => R;

const composeEnhancers = (
  process.env.NODE_ENV === 'development' &&
  window && __REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) || compose;

export function configureStore(history: History, initialState?: RootState) {

  const middlewares: Middleware[] = [
    routerMiddleware(history)
  ];

  const enhancer = composeEnhancers(
    applyMiddleware(...middlewares)
  );

  return createStore(
    rootReducer,
    initialState!,
    enhancer
  );
}
