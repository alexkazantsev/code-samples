import { IDEA_TYPES as TYPES } from './../types';
import { normalizeIdeas, normalizeIdea } from './../utils';

class Idea {
  content = '';
  impact = 10;
  ease = 10;
  confidence = 10;
  isNew = true;
}

const initialState = {
  ideas: [],
};

export const IdeaReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case TYPES.FETCH_ALL_IDEAS_SUCCESS:
      return { ...state, ideas: normalizeIdeas(payload) };
    case TYPES.ADD_NEW_IDEA:
      const hasNewIdea = state.ideas.find(i => i.isNew);
      if (hasNewIdea) return state;
      return { ...state, ideas: [new Idea(), ...state.ideas] };
    case TYPES.CANCEL_IDEA:
      return {
        ...state, ideas: state.ideas.map(idea => {
          idea.isNew = false;
          return idea;
        }).filter(i => !!i.id)
      };
    case TYPES.SAVE_IDEA_SUCCESS:
      return { ...state, ideas: [normalizeIdea(payload), ...state.ideas] };
    case TYPES.REMOVE_IDEA_SUCCESS:
      return { ...state, ideas: state.ideas.filter(({ id }) => id !== payload) };
    case TYPES.SET_IDEAS_AS_UPDATED:
      return {
        ...state, ideas: state.ideas.map(idea => {
          idea.isNew = idea.id === payload;
          return idea;
        })
      }
    case TYPES.UPDATE_IDEA_SUCCESS:
      return {
        ...state, ideas: state.ideas.map(idea => {
          if (idea.id === payload.id) idea = { ...idea, ...normalizeIdea(payload) };
          return idea;
        })
      }
    case TYPES.CLEAR_IDEAS:
      return { ...state, ideas: [] };
    default: return state;
  }
}
