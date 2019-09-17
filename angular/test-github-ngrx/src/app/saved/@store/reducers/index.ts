import { ISavedState, reducer } from './saved.reducer';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

export class SavedReposFeatureState {
  savedReposReducer: ISavedState;
}

export const reducers: ActionReducerMap<SavedReposFeatureState> = {
  savedReposReducer: reducer,
};

export const getSavedReposFeatureState = createFeatureSelector('saved');
