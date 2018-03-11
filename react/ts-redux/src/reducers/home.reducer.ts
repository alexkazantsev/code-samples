import { combineReducers } from 'redux';
import { THomeActions } from './../actions';

export type HomeState = {
  readonly test: number,
};

export const homeReducer = combineReducers<HomeState, THomeActions>({
  test: (state = 0, action) => 1
});
