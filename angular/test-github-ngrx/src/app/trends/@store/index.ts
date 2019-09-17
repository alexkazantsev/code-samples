import { ITrendsState, reducer } from './trends.reducers';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

export interface TrendsFeatureState {
  trendsReducer: ITrendsState;
}

export const reducers: ActionReducerMap<TrendsFeatureState> = {
  trendsReducer: reducer,
};

export const getTrendsState = createFeatureSelector<ITrendsState>('trends');
