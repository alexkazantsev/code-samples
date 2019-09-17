import { createAction, props } from '@ngrx/store';
import { GithubRepo } from '../../shared/models/github-repo.model';

export const loadTrends = createAction('[Trends] Load trends');

export const loadTrendsSuccess = createAction('[Trends] Load trends success', props<{ payload: GithubRepo[] }>());

export const loadTrendsFail = createAction('[Trends] Load trends fail', props<Error>());

export const saveRepo = createAction('[Repo] Save', props<{ payload: { author: string, repoName: string } }>());

export const removeRepo = createAction('[Repo] Remove', props<{ payload: GithubRepo }>());
