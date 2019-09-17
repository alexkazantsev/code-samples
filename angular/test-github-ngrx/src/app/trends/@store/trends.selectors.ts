import { createSelector } from '@ngrx/store';
import { ITrendsState } from './trends.reducers';
import { getTrendsState } from './index';
import { GithubRepo } from '../../shared/models/github-repo.model';

export const isProcessing = createSelector(
  getTrendsState,
  (state: ITrendsState): boolean => state.processing,
);

export const getAllTrends = createSelector(
  getTrendsState,
  (state: ITrendsState): GithubRepo[] => state.trends,
);

export const isLoaded = createSelector(
  getTrendsState,
  (state: ITrendsState): boolean => state.loaded,
);
