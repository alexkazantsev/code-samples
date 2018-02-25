import Cookie from 'js-cookie';

const TOKENS = Symbol('tokens');

export class CookieService {

  static [TOKENS] = ['jwt', 'refresh_token', 'refresh_token_expired'];

  static setCookie(key, value, exp) {
    if (!process.browser) return; /* SET UP COOKIES ONLY IN BROWSER */
    Cookie.set.call(null, key, value, exp ? { expires: exp } : null);
  }

  static unsetCookie(cookies) {
    if (!process.browser) return;
    if (Array.isArray(cookie)) {
      cookie.map(item => Cookie.remove(item));
    } else {
      Cookie.remove(cookie);
    }
  }

  static getFromLocalCookie = (key) => Cookie.getJSON(key);

  static getFromServerCookie = (req, key) => {
    if (!req.headers.cookie) return;
    const jwtCookie = req.headers.cookie.split(';');
    const siteCookie = jwtCookie.find(item => item.trim().slice(0, key.length) === key);
    if (!siteCookie) return;

    return jwtCookie.find(c => c.trim().startsWith(key)).split('=')[1];
  };

  static all(req) {
    let result = [];
    const _tokens = this[TOKENS];

    if (process.browser && req) result = _tokens.map(t => CookieService.getFromServerCookie(req, t));
    else result = _tokens.map(t => CookieService.getFromLocalCookie(t));

    return result.reduce((p, c, i) => ({ ...p, [_tokens[i]]: c }), {});
  }

}
