import * as jwt from 'jsonwebtoken';
import { SALT } from './../config';

const TOKEN_CONFIG = {
  KEY: SALT,
  expires: '1y',
};

export class TokenService {
  public static encode(data) {
    return jwt.sign(data, TOKEN_CONFIG.KEY, { expiresIn: TOKEN_CONFIG.expires });
  }

  public static decode(token) {
    try {
      return jwt.verify(token, TOKEN_CONFIG.KEY);
    } catch (e) {
      return null;
    }
  }
}
