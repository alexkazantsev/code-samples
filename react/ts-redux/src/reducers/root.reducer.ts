import {
  combineReducers,
  Dispatch as ReduxDispatch,
  Reducer as ReduxReducer,
} from 'redux';
import { routerReducer, RouterState } from 'react-router-redux';

import { RootAction } from './../actions';
import { HomeState, HomeReducer } from './';

interface StoreEnhancerState { }

export interface RootState extends StoreEnhancerState {
  router: RouterState;
  home: HomeState;
}

export const rootReducer = combineReducers<RootState>({
  router: routerReducer,
  home: HomeReducer,
});

export type Dispatch = ReduxDispatch<RootAction>;
export type Reducer = ReduxReducer<RootState, RootAction>;
