import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form'
import {
  CommonReducer as common,
  AuthReducer as auth,
  IdeaReducer as idea,
  UserReducer as user,
} from './../reducers';

const rootReducer = combineReducers({
  common,
  auth,
  idea,
  user,
  form,
});

export default rootReducer;
