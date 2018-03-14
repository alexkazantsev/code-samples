import { combineEpics, Epic } from 'redux-observable';
import { isActionOf } from 'typesafe-actions';

import { RootState } from './../reducers/root.reducer';
import { RootAction } from './../actions/root.actions';
import { loginActions } from './../actions';

const loginReqeust: Epic<RootAction, RootState> =
  (action$, store) => action$
    .filter(isActionOf(loginActions.loginRequest))
    .do(action => {
      console.log(action);
      return {};
    });

export const loginEpics = combineEpics(loginReqeust);
