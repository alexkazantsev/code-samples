import { spawn, all } from 'redux-saga/effects';
import {
  CommonSaga,
  AuthSaga,
} from './../sagas';

const rootSaga = function* () {
  yield all([
    spawn(CommonSaga),
    spawn(AuthSaga),
  ]);
};

export default rootSaga;
