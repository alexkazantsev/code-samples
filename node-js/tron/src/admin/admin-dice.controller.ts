import { Body, ClassSerializerInterceptor, Controller, Post, UseInterceptors } from '@nestjs/common';
import { AdminService } from './admin.service';
import { ApiOperation, ApiUseTags } from '@nestjs/swagger';
import { InitGameDto } from './dto/init-game.dto';
import { GameType } from '../common/enums/GameType.enum';
import { FinishGameDto } from './dto/finish-game.dto';

@Controller('admin/dice')
@ApiUseTags('admin/dice')
@UseInterceptors(ClassSerializerInterceptor)
export class AdminDiceController {
  constructor(private readonly adminService: AdminService) {}

  @Post('/trx/init-game')
  @ApiOperation({ title: 'Init game by admin for TRX' })
  initGame_TRX(@Body() { hashServerSeed }: InitGameDto): Promise<any> {
    return this.adminService.initGame(hashServerSeed, GameType.DICE_TRX);
  }

  @Post('/trx/finish-game')
  @ApiOperation({ title: 'Finish game by admin for TRX' })
  finishGame_TRX(@Body() { serverSeed }: FinishGameDto): Promise<any> {
    return this.adminService.finishGame(serverSeed, GameType.DICE_TRX);
  }

  @Post('/usdt/init-game')
  @ApiOperation({ title: 'Init game by admin for USDT' })
  initGame_USDT(@Body() { hashServerSeed }: InitGameDto): Promise<any> {
    return this.adminService.initGame(hashServerSeed, GameType.DICE_USDT);
  }

  @Post('/usdt/finish-game')
  @ApiOperation({ title: 'Finish game by admin for USDT' })
  finishGame_USDT(@Body() { serverSeed }: FinishGameDto): Promise<any> {
    return this.adminService.finishGame(serverSeed, GameType.DICE_USDT);
  }
}
