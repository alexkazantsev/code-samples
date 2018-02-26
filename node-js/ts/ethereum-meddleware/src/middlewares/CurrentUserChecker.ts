import { Action } from 'routing-controllers';
import * as Boom from 'boom';

import { DataProvider, TokenService } from './../utils';
import { User } from './../models';

export async function CurrentUserChecker(action: Action) {
  try {
    let userId = action.context.state.userId;
    if (!userId) {
      userId = TokenService.decode(action.request.headers.authorization).userId;
    }
    const user = await DataProvider.connection.getRepository(User)
      .createQueryBuilder('user')
      .where(`user.id=${userId}`)
      .getOne();
    if (!user) { throw Boom.badRequest('Wrong user data'); }
    return user;
  } catch (e) {
    return false;
  }
}
