import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import { RootState, rootReducer } from './../reducers/root.reducer';
import { History } from 'history';

export const configureStore = (history: History, initialState?: RootState) => {
  const middleware = routerMiddleware(history);

  const enhancer = compose(
    applyMiddleware(middleware, createLogger({ collapsed: true })),
  );

  return createStore(
    rootReducer,
    initialState!,
    enhancer
  );
};
