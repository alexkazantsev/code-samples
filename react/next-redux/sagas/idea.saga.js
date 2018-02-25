import { spawn, all, take, call, put } from 'redux-saga/effects';

import {
  FETCH_ALL_IDEAS,
  FETCH_ALL_IDEAS_SUCCESS,
  FETCH_ALL_IDEAS_ERROR,
  SAVE_IDEA,
  SAVE_IDEA_SUCCESS,
  UPDATE_IDEA,
  UPDATE_IDEA_SUCCESS,
  REMOVE_IDEA,
  REMOVE_IDEA_SUCCESS,
} from './../types/idea.types';

import { ideaActions } from './../actions';

import { ApiService } from './../utils';

function* fetchIdeas() {
  while (true) {
    try {
      yield take(FETCH_ALL_IDEAS);
      const { response } = yield call(ApiService.instance.get(), 'ideas', { page: 1 });
      yield put({ type: FETCH_ALL_IDEAS_SUCCESS, payload: response });
    } catch (e) {
      console.error(e);
      yield put({ type: FETCH_ALL_IDEAS_ERROR });
    }
  }
}

function* saveIdea() {
  while (true) {
    try {
      const { payload } = yield take(SAVE_IDEA);
      const { response } = yield call(ApiService.instance.post(), 'ideas', payload);
      yield put(ideaActions.cancelIdea());
      yield put({ type: SAVE_IDEA_SUCCESS, payload: response });
    } catch (e) {
      console.error(e);
    }
  }
}

function* updateIdea() {
  while (true) {
    try {
      const { payload } = yield take(UPDATE_IDEA);
      const { response } = yield call(ApiService.instance.put(), `ideas/${payload.id}`, payload);
      yield put(cancelIdea());
      yield put({ type: UPDATE_IDEA_SUCCESS, payload: response });
    } catch (e) {
      console.error(e);
    }
  }
}

function* removeIdea() {
  while (true) {
    try {
      const { payload } = yield take(REMOVE_IDEA);
      const { error } = yield call(ApiService.instance.delete(), `ideas/${payload}`);
      yield put({ type: REMOVE_IDEA_SUCCESS, payload });
    } catch (e) {
      console.error(e);
    }
  }
}



export const IdeaSaga = function* () {
  yield all([
    spawn(fetchIdeas),
    spawn(saveIdea),
    spawn(updateIdea),
    spawn(removeIdea),
  ]);
}
