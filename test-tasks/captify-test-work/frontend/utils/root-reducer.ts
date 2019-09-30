import { combineReducers } from 'redux';
import { homeReducer } from '../modules/home/@store/home.reducer';

export default combineReducers({
  home: homeReducer,
});
