import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import RootReducer from './root-reducer';
import { agent } from './api-agent';

const env = process.env.NODE_ENV;

export const configureStore = (initialState) => {
  let middlewares = applyMiddleware(thunkMiddleware.withExtraArgument(agent));

  if (env !== 'production' && process.browser) {
    middlewares = composeWithDevTools(
      middlewares,
      applyMiddleware(createLogger({ collapsed: true })),
    );
  }
  return createStore(RootReducer, initialState, compose(middlewares));
};
