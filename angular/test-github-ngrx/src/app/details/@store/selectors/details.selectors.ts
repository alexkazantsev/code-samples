import { createSelector } from '@ngrx/store';
import * as fromReducers from '../reducers';
import { IDetailsState } from '../reducers/details.reducers';
import { GithubRepo } from '../../../shared/models/github-repo.model';
import { GithubUser } from '../../../shared/models/github-user.model';


export const getDetailsState = createSelector(
  fromReducers.getRepoDetailsFeatureState,
  (state: fromReducers.RepoDetailsFeatureState) => state.repoDetailsReducer,
);

export const isDetailsLoaded = createSelector(
  getDetailsState,
  (state: IDetailsState): boolean => state.loadedDetails,
);

export const isContributorsLoaded = createSelector(
  getDetailsState,
  (state: IDetailsState): boolean => state.contributorsLoaded,
);

export const getRepoDetails = createSelector(
  getDetailsState,
  (state: IDetailsState): GithubRepo | null => state.repoDetails,
);

export const getRepoContributorsDetails = createSelector(
  getDetailsState,
  (state: IDetailsState): GithubUser[] => state.contributors,
);
