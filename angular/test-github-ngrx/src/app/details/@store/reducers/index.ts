import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromDetails from './details.reducers';

export class RepoDetailsFeatureState {
    repoDetailsReducer: fromDetails.IDetailsState;
}

export const reducers: ActionReducerMap<RepoDetailsFeatureState> = {
    repoDetailsReducer: fromDetails.reducer,
};

export const getRepoDetailsFeatureState: any = createFeatureSelector('details');
