import { spawn, all, take, call, put } from 'redux-saga/effects';
import { ApiService } from './../utils';
import { USER_FETCH, USER_FETCH_SUCCESS } from './../types/user.types';

function* fetchUser() {
  while (true) {
    try {
      const { onSuccess } = yield take(USER_FETCH);

      const { response } = yield call(ApiService.instance.get(), 'me');
      yield put({ type: USER_FETCH_SUCCESS, payload: response });
      if (onSuccess) yield call(onSuccess);
    } catch (e) {
      console.error(e);
    }
  }
}

export const UserSaga = function* () {
  yield all([
    spawn(fetchUser),
  ]);
}
