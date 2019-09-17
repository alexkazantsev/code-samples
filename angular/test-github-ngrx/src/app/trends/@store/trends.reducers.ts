import { Action, createReducer, on } from '@ngrx/store';
import { loadTrends, loadTrendsFail, loadTrendsSuccess, removeRepo, saveRepo } from './trends.actions';
import { GithubRepo } from '../../shared/models/github-repo.model';


export interface ITrendsState {
  processing: boolean;
  loaded: boolean;
  error: Error;
  trends: GithubRepo[];
  savedTrends: number[];
}

export const initialState: ITrendsState = {
  processing: false,
  loaded: false,
  error: null,
  trends: [],
  savedTrends: [],
};

const trendsReducer = createReducer(
  initialState,
  on(loadTrends, state => ({ ...state, processing: true, error: null })),
  on(loadTrendsSuccess, (state, action) => ({
    ...state,
    trends: action.payload,
    processing: false,
    loaded: true,
  })),
  on(loadTrendsFail, ((state, payload) => ({ ...state, processing: false, error: payload }))),
  on(saveRepo, (state, { payload: { repoName, author } }) => {
    return {
      ...state,
      trends: state.trends.map(repo => {
        if (repo.name !== repoName && repo.owner.login !== author) {
          return repo;
        }
        return { ...repo, saved: true };
      }),
    };
  }),
  on(removeRepo, (state, { payload: { full_name } }) => ({
    ...state,
    trends: state.trends.map((repo) => {
      if (full_name !== repo.full_name) {
        return repo;
      }
      return { ...repo, saved: false };
    }),
  })),
);

export function reducer(state: ITrendsState, action: Action) {
  return trendsReducer(state, action);
}
