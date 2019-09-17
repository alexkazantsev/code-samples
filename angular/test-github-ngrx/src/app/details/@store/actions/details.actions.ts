import { createAction, props } from '@ngrx/store';

import { GithubRepo } from 'src/app/shared/models/github-repo.model';
import { GithubUser } from '../../../shared/models/github-user.model';

export interface RepoProps {
  payload: {
    owner: string;
    repo: string;
  };
}

export const loadDetails = createAction('[Repo Details] Load Repo Details', props<RepoProps>());
export const loadDetailsSuccess = createAction('[Repo Details] Load Repo Details Success', props<{ payload: GithubRepo }>());
export const loadDetailsFail = createAction('[Repo Details] Load Repo Details Fail', props<{ payload: Error }>());

export const loadContributors = createAction('[Repo Details] Load Contributors', props<RepoProps>());
export const loadContributorsSuccess = createAction('[Repo Details] Load Contributors Success', props<{ payload: any }>());
export const loadContributorsFail = createAction('[Repo Details] Load Contributors Fail', props<{ payload: Error }>());

export const loadContributorFollowers = createAction('[Repo Details] Load Contributor\'s followers');

export const loadContributorFollowersSuccess = createAction('[Repo Details] Load Contributor\'s Followers Success',
  props<{ payload: { followers: GithubUser[], id: number } }>());

export const loadContributorFollowersFail = createAction('[Repo Details] Load Contributor\'s Followers Fail',
  props<{ payload: Error }>());

export const loadAllFollowersSuccess = createAction('[Repo Details] Load All Contributor\'s Followers Success');
