import { Action, createReducer, on } from '@ngrx/store';

import { GithubRepo } from 'src/app/shared/models/github-repo.model';
import { GithubUser } from 'src/app/shared/models/github-user.model';
import {
  loadContributorFollowersSuccess,
  loadContributors,
  loadContributorsSuccess,
  loadDetails,
  loadDetailsFail,
  loadDetailsSuccess,
} from '../actions';


export interface IDetailsState {
  processing: boolean;
  loadedDetails: boolean;
  contributorsLoaded: boolean;
  error: Error;
  repoDetails: GithubRepo;
  contributors: GithubUser[];
}

export const initialState: IDetailsState = {
  processing: false,
  loadedDetails: false,
  contributorsLoaded: false,
  error: null,
  repoDetails: null,
  contributors: [],
};

const detailsReducer = createReducer(
  initialState,
  on(loadDetails, state => ({ ...state, processing: true, error: null })),
  on(loadDetailsSuccess, ((state, action) => ({
    ...state,
    processing: false,
    loadedDetails: true,
    repoDetails: action.payload,
  }))),
  on(loadDetailsFail, ((state, action) => ({
    ...state,
    processing: false,
    loadedDetails: false,
    error: action.payload,
  }))),
  on(loadContributors, state => ({ ...state, processing: true, error: null })),
  on(loadContributorsSuccess, (state, action) => ({
    ...state,
    processing: false,
    contributorsLoaded: true,
    contributors: action.payload,
  })),
  on(loadContributorFollowersSuccess, ((state, { payload: { followers, id } }) => ({
    ...state,
    contributors: [...state.contributors.map(user => {
      if (user.id !== id) {
        return user;
      }
      return { ...user, followers, followersLoaded: true };
    })],
  }))),
);

export function reducer(state: IDetailsState, action: Action) {
  return detailsReducer(state, action);
}

