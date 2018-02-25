import store from 'store';

import { CookieService } from './';
import { TOKEN_KEY } from './../config';

export const normalizeIdea = idea => ({ ...idea, average_score: idea.average_score.toFixed(1) });

export const normalizeIdeas = ideas => ideas.map(normalizeIdea);

export const generateArray = (len = 10) => Array.from(Array(len), (x, i) => ++i);

export const calculateAvg = (...args) => {
  const avg = args.reduce((prev, curr) => prev + parseInt(curr, 10), 0);
  return (avg / args.length).toFixed(1);
};

export const removeToken = () => {
  store.remove(TOKEN_KEY);
  CookieService.unsetToken(TOKEN_KEY);
};
