import { spawn, all, take, call, put } from 'redux-saga/effects';
import axios from 'axios';

import { TOKEN_EXPIRED_TIME, API_URL } from './../config';
import { ApiService, CookieService } from './../utils';

import {
  SIGNUP,
  SIGNUP_SUCCESS,
  LOGIN,
  LOGIN_SUCCESS,
  CHECK_TOKEN,
  UPDATE_TOKEN,
  UPDATE_TOKEN_SUCCESS,
  LOGOUT,
  CHANGE_USER_AUTH,
} from './../types/auth.types';
import {
  signupError,
  clearSignupError,
  loginError,
  clearLoginError,
} from './../actions/auth.actions';

import { clearIdeas } from './../actions/idea.actions';
import { fetchUser, clearUser } from './../actions/user.actions';

function* signup() {
  while (true) {
    try {
      const { payload, onSuccess } = yield take(SIGNUP);
      yield put(clearSignupError());

      const { response: { jwt, refresh_token } } = yield call(ApiCaller.post, 'users', payload);
      yield call(AuthService.setTokens, jwt, refresh_token);
      yield put({ type: SIGNUP_SUCCESS });
      yield call(onSuccess);
    } catch (e) {
      yield put(signupError(e.reason ? e.reason : e));
    }
  }
}

function* login() {
  while (true) {
    try {
      const { payload, onSuccess } = yield take(LOGIN);
      yield put(clearLoginError());

      const { response: { jwt, refresh_token } } =
        yield call(ApiService.instance.post(), 'access-tokens', payload);

      yield call(CookieService.setCookie, 'jwt', jwt);
      yield call(CookieService.setCookie, 'refresh_token', refresh_token);
      yield put({ type: CHANGE_USER_AUTH, payload: true });
      yield put({ type: LOGIN_SUCCESS });
      yield call(onSuccess);
    } catch (e) {
      yield put(loginError(e.reason ? e.reason : e));
    }
  }
}

function* updateToken() {
  while (true) {
    try {
      yield take(UPDATE_TOKEN);

      const { refresh_token } = yield call(CookieService.all());
      const { response: { jwt } } =
        yield call(ApiService.caller.post, 'access-tokens/refresh', { refresh_token });

      yield call(ApiService.setCookie, 'jwt', jwt);
      yield put({ type: UPDATE_TOKEN_SUCCESS });
    } catch (e) {
      console.error(e);
    }
  }
}

function* logout() {
  while (true) {
    try {
      const { onSuccess } = yield take(LOGOUT);
      const { refresh_token, jwt } = yield call(AuthService.getTokens);

      /** IN ANY CASE WE NEED LOGOUT USER */
      yield put(clearUser());
      yield put(clearIdeas());
      yield call(onSuccess);
      yield call(AuthService.unsetTokens);

      /**
       * AXIOS INSTANCE DOEN'T SUPPORT BODY INSIDE `DELETE` METHOD
       * SO WE'LL USE SINGLETONE INSTEAD AS WE DON'T HAVE A TIME 
       * TO SWITCH TO ANOTHER HTTP LIBRARY.
       */
      yield call(axios, {
        method: 'DELETE',
        url: `${API_URL}access-tokens`,
        headers: { 'x-access-token': jwt, },
        data: { refresh_token }
      });
    } catch (e) {
      console.error(e);
    }
  }
}

export const AuthSaga = function* () {
  yield all([
    spawn(signup),
    spawn(login),
    spawn(updateToken),
    spawn(logout),
  ]);
}
