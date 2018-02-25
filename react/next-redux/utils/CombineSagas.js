import { spawn, all } from 'redux-saga/effects';
import * as sagas from './../sagas';

const rootSaga = function* () {
  yield all(Object.keys(sagas).map(s => spawn(sagas[s])));
};

export default rootSaga;
