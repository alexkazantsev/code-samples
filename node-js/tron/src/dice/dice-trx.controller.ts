import { ClassSerializerInterceptor, Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { DiceService } from './dice.service';
import { GetGameDto } from './dto/get-game.dto';
import { GetGameResponseDto } from './dto/get-game-response.dto';
import { GetResultNumberDto } from './dto/get-result-number.dto';

@Controller('dice/trx')
@ApiUseTags('dice/trx')
@UseInterceptors(ClassSerializerInterceptor)
export class DiceTrxController {
  constructor(private readonly diceService: DiceService) {}

  @Get('/rtp')
  @ApiOperation({ title: 'Get RTP' })
  @ApiResponse({ status: 200, type: Number })
  getRtp_TRX(): Promise<number> {
    return this.diceService.getRtp_TRX();
  }

  @Get('/rtp-driver')
  @ApiOperation({ title: 'Get RTP Driver' })
  @ApiResponse({ status: 200, type: Number })
  getRtpDivider_TRX(): Promise<number> {
    return this.diceService.getRtpDivider_TRX();
  }

  @Get('/min-bet')
  @ApiOperation({ title: 'Get a minimal bet' })
  @ApiResponse({ status: 200, type: Number })
  getMinBet_TRX(): Promise<number> {
    return this.diceService.getMinBet_TRX();
  }

  @Get('/max-bet')
  @ApiOperation({ title: 'Get a maximal bet' })
  @ApiResponse({ status: 200, type: Number })
  getMaxBet_TRX(): Promise<number> {
    return this.diceService.getMaxBet_TRX();
  }

  @Get('/contract-balance')
  @ApiOperation({ title: 'Get contract balance' })
  @ApiResponse({ status: 200, type: Number })
  getBalance_TRX(): Promise<number> {
    return this.diceService.getBalance_TRX();
  }

  @Get('/game')
  @ApiOperation({ title: 'Get game by hash server seed' })
  @ApiResponse({ status: 200, type: GetGameResponseDto })
  getGame_TRX(@Query() { hashServerSeed }: GetGameDto): Promise<GetGameResponseDto> {
    return this.diceService.getGame_TRX(hashServerSeed);
  }

  @Get('/game-result')
  @ApiOperation({ title: 'Winning number generation using combination of client seed, server seed and shifting operations' })
  @ApiResponse({ status: 200, type: Number })
  getGameResult_TRX(@Query() { clientSeed, serverSeed, rollUnder }: GetResultNumberDto): Promise<number> {
    return this.diceService.getGameResult_TRX(clientSeed, serverSeed, rollUnder);
  }
}
