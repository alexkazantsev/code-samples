import {
  FETCH_ALL_IDEAS,
  ADD_NEW_IDEA,
  CANCEL_IDEA,
  SAVE_IDEA,
  UPDATE_IDEA,
  REMOVE_IDEA,
  SET_IDEAS_AS_UPDATED,
  CLEAR_IDEAS,
} from './../types/idea.types';

export const fetchIdeas = () => ({ type: FETCH_ALL_IDEAS });

export const addNewIdea = () => ({ type: ADD_NEW_IDEA });
export const cancelIdea = () => ({ type: CANCEL_IDEA });
export const saveIdea = payload => ({ type: SAVE_IDEA, payload });
export const updateIdea = payload => ({ type: UPDATE_IDEA, payload });

export const setAsUpdated = payload => ({ type: SET_IDEAS_AS_UPDATED, payload });
export const removeIdea = payload => ({ type: REMOVE_IDEA, payload });
export const clearIdeas = () => ({ type: CLEAR_IDEAS });
