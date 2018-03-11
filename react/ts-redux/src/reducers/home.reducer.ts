import { combineReducers } from 'redux';
import { getType } from 'typesafe-actions';
import { HomeActions } from './../actions';

export type HomeState = {
  readonly test: number,
};

export const HomeReducer = combineReducers<HomeState>({
  test: (state = 0, action) => {
    switch (action.type) {
      case getType(HomeActions.test):
        return state + 1;
      default:
        return state;
    }
  }
});
