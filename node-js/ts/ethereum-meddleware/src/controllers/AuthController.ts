import {
  JsonController,
  Body,
  Post,
} from 'routing-controllers';
import * as Boom from 'boom';

import { BaseController } from './BaseController';
import { Login } from './../validation';
import { TokenService, PasswordService, W3Service } from './../utils';
import { User as ValidatedUser } from './../validation';
import { User, Wallet } from './../models';

@JsonController('/auth')
export class AuthController extends BaseController {

  @Post('/signin')
  public async signin( @Body() credentials: Login) {
    const user = await this.userRepository.findOne({ where: { email: credentials.email } });
    if (!user) return false;
    console.log(user.password, credentials.password)
    if (!user || !PasswordService.comparePassword(user.password, credentials.password)) {
      throw Boom.unauthorized();
    } else {
      const token = TokenService.encode({ userId: user.id });
      return { token };
    }
  }

  @Post('/signup')
  public async signup( @Body() _user: ValidatedUser) {
    const user = await this.userRepository.persist(new User(_user));
    
    /** CREATE NEW WALLET */
    const service = new W3Service();
    const wallet = await service.createWallet();
    await this.walletRepository.persist(new Wallet(user, wallet.privateKey));
    return user;
  }

}
