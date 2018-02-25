import store from 'store';

import { CookieService } from './';
import { TOKEN_KEY } from './../config/app.config';

export const removeToken = () => {
  store.remove(TOKEN_KEY);
  CookieService.unsetToken(TOKEN_KEY);
};
