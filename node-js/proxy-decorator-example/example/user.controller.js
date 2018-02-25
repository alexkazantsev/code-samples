import Boom from 'boom';

import Validate from './../index';
import { createSchema } from './schemas';
import db from './../../models';

export class UserController {

  @Validate(createSchema)
  static async create(ctx, next) {
    const { request: { body: { first_name, last_name, password, email } } } = ctx;
    const userData = {
      first_name,
      last_name,
      email,
      password: PasswordService.saltHashPassword(password),
    };

    const user = await db.user.create(userData);
    ctx.body = user;
    await next();
  }
}
