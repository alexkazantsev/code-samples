import {
  JsonController,
  Body,
  Post,
  Get,
  Put,
  Param,
  Delete,
  HttpCode,
  Authorized,
} from 'routing-controllers';
import * as Boom from 'boom';

import { BaseController } from './BaseController';
import { Stock } from './../models';

@JsonController('/stock')
export class StockController extends BaseController {

  @Authorized()
  @Get('/')
  public async fetchAll() {
    const stocks = await this.stockRepository.find();
    return { stocks };
  }

  @Authorized()
  @Post('/')
  public async create( @Body() _stock: any) {
    const stock = await this.stockRepository.persist(new Stock(_stock));
    return stock;
  }

  @Authorized()
  @Put('/:id')
  public async update( @Body() _stock: Stock) {
    const stock = await this.stockRepository.persist(_stock);
    return stock;
  }

  @Authorized()
  @HttpCode(204)
  @Delete('/:id')
  public async remove( @Param('id') id: number) {
    await this.stockRepository.removeById(id);
    return true;
  }

}
