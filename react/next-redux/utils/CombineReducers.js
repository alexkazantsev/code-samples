import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form'
import {
  commonReducer as common,
  authReducer as auth,
} from './../reducers';

const rootReducer = combineReducers({
  common,
  auth,
  form,
});

export default rootReducer;
