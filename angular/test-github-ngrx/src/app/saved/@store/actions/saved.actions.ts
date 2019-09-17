import { createAction, props } from '@ngrx/store';
import { GithubRepo } from '../../../shared/models/github-repo.model';

export const saveRepo = createAction('[Saved] Save Repo', props<{ payload: GithubRepo }>());

export const saveRepoSuccess = createAction('[Saved] Save Repo Success', props<{ payload: GithubRepo }>());

export const saveRepoFail = createAction('[Saved] Save Repo Fail');
