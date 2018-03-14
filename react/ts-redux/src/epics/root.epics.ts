import { combineEpics } from 'redux-observable';

import { loginEpics as login } from './';

export const rootEpic = combineEpics(
  login
);
