import { spawn, all, take, call, put } from 'redux-saga/effects';
import store from 'store';

import { ApiCaller } from './../utils';
import { AUTH_TYPES } from './../types';
import { authActions } from './../actions';
import { CookieService } from './../utils';

function* login() {
  while (true) {
    try {
      const { payload, onSuccess } = yield take(AUTH_TYPES.LOGIN_REQUEST);
      yield put(authActions.clearLoginError());

      const { response, response: { admin, active } } =
        yield call(ApiCaller.post, 'users/login', payload);

      if (!admin || !active) throw new Error({ error: 'Wrong email or password' });

      store.set('KidsFundAdmin_token', response.token);
      yield put(authActions.loginSuccess(response));
      yield call(CookieService.setToken, response.token);
      yield call(onSuccess);
    } catch (error) {
      yield put(authActions.loginFail(error.error));
    }
  }
}

export const AuthSaga = function* () {
  yield all([
    spawn(login)
  ]);
}
