import {
  combineReducers,
  Dispatch as ReduxDispatch,
  Reducer as ReduxReducer,
} from 'redux';
import { routerReducer, RouterState } from 'react-router-redux';

import { RootAction } from './../actions';
import { HomeState, homeReducer } from './';

interface StoreEnhancerState { }

export interface RootState extends StoreEnhancerState {
  router: RouterState;
  home: HomeState;
}

export const rootReducer = combineReducers<RootState, RootAction>({
  router: routerReducer,
  home: homeReducer,
});

export type Dispatch = ReduxDispatch<RootAction>;
export type Reducer = ReduxReducer<RootState, RootAction>;
