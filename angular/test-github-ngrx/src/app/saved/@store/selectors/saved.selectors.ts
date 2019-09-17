import { createSelector } from '@ngrx/store';
import { getSavedReposFeatureState, SavedReposFeatureState } from '../reducers';
import { ISavedState } from '../reducers/saved.reducer';
import { GithubRepo } from '../../../shared/models/github-repo.model';


export const getSavedState = createSelector(
  getSavedReposFeatureState,
  (state: SavedReposFeatureState): ISavedState => state.savedReposReducer,
);


export const getSavedRepos = createSelector(
  getSavedState,
  (state: ISavedState): GithubRepo[] => state.repos,
);

export const isRepoSaved = createSelector(
  getSavedState,
  (state: ISavedState, props: any): boolean => !!state.repos.find(r => r.full_name === props.full_name),
);
