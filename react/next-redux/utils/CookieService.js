import Cookie from 'js-cookie';
import _ from 'lodash';// eslint-disable-line
import config from '../config/api.config';
import { TOKEN_KEY } from './../config/app.config';

export const setToken = (token, isSession = true) => {
  if (!process.browser) return;
  if (isSession) {
    Cookie.set(TOKEN_KEY, `${token}`);
  } else {
    Cookie.set(TOKEN_KEY, `${token}`, { expires: 365 });
  }
};

export const unsetToken = (cookie) => {
  if (!process.browser) return;
  if (Array.isArray(cookie)) {
    cookie.map(item => Cookie.remove(item));
  } else {
    Cookie.remove(cookie);
  }
};

export const getTokenFromServerCookie = (req) => {
  if (!req.headers.cookie) return;
  const jwtCookie = req.headers.cookie.split(';');
  const siteCookie = _.find(jwtCookie, item => item.trim().slice(0, TOKEN_KEY.length) === TOKEN_KEY);
  if (!siteCookie) return;

  return jwtCookie.find(c => c.trim().startsWith(TOKEN_KEY)).split('=')[1];// eslint-disable-line
};

export const getTokenFromLocalCookie = () => (
  Cookie.getJSON(TOKEN_KEY)
);
