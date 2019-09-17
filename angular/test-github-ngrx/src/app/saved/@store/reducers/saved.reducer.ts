import { GithubRepo } from '../../../shared/models/github-repo.model';
import { Action, createReducer, on } from '@ngrx/store';
import { saveRepoSuccess } from '../actions/saved.actions';

export interface ISavedState {
  repos: GithubRepo[];
}

export const initialState: ISavedState = {
  repos: [],
};

const savedReducer = createReducer(
  initialState,
  on(saveRepoSuccess, (state, action) => ({ ...state, repos: [...state.repos, action.payload] })),
);

export function reducer(state: ISavedState, action: Action) {
  return savedReducer(state, action);
}
