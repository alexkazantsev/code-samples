import {
  JsonController,
  Body,
  Post,
  Get,
  Authorized,
} from 'routing-controllers';
import * as Boom from 'boom';

import { BaseController } from './BaseController';
import { Transaction } from './../models';

@JsonController('/transaction')
export class TransactionController extends BaseController {

  @Authorized()
  @Get('/')
  public async fetchAll() {

  }
  
}
