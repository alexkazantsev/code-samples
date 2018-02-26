import {
  JsonController,
  Body,
  Post,
  Get,
  Authorized,
} from 'routing-controllers';
import * as Boom from 'boom';

import { BaseController } from './BaseController';
import { TrashType } from './../models';

@JsonController('/stock')
export class TrashTypeController extends BaseController {

  @Authorized()
  @Get('/')
  public async fetchAll() {

  }
  
}
