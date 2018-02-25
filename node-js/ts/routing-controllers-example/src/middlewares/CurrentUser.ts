import { Action, NotFoundError } from 'routing-controllers';

import { User } from './../models';
import { DataProvider } from './../utils';

export const CurrentUser = async (action: Action) => {
  const user = await DataProvider.connection
    .getRepository(User)
    .findOneById(action.request.params.id);
  if (!user) throw new NotFoundError('User was not found.');
  return user;
}
