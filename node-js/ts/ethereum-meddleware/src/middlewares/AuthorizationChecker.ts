import { Action } from 'routing-controllers';

import { TokenService } from './../utils';

export async function AuthorizationChecker(action: Action) {
  try {
    const token = action.request.headers.authorization;
    const { userId } = TokenService.decode(token);
    action.context.state.userId = userId;
    return true;
  } catch (e) {
    return false;
  }
}
