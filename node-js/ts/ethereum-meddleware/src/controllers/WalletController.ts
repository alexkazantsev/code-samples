import {
  JsonController,
  Body,
  Get,
  Authorized,
  State,
  CurrentUser,
} from 'routing-controllers';
import * as Boom from 'boom';

import { W3Service } from './../utils';
import { User } from './../models';
import { BaseController } from './BaseController';

@JsonController('/wallet')
export class WalletController extends BaseController {

  @Authorized()
  @Get('/balance')
  public async getBalance() {

    const wallet = await this.walletRepository
      .createQueryBuilder('wallet')
      .where('userId=:id', { id: 18 })
      .getOne();

    if (!wallet) throw Boom.notFound();

    const service = new W3Service(wallet);
    const balance = await service.getBalance(wallet.key);
    return { balance };
  }

}
