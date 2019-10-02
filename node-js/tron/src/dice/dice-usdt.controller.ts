import { ClassSerializerInterceptor, Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { DiceService } from './dice.service';
import { GetGameDto } from './dto/get-game.dto';
import { GetGameResponseDto } from './dto/get-game-response.dto';
import { GetResultNumberDto } from './dto/get-result-number.dto';

@Controller('dice/usdt')
@ApiUseTags('dice/usdt')
@UseInterceptors(ClassSerializerInterceptor)
export class DiceUsdtController {
  constructor(private readonly diceService: DiceService) {}

  @Get('/rtp')
  @ApiOperation({ title: 'Get RTP for USDT' })
  @ApiResponse({ status: 200, type: Number })
  getRtp_USDT(): Promise<number> {
    return this.diceService.getRtp_USDT();
  }

  @Get('/rtp-driver')
  @ApiOperation({ title: 'Get RTP Driver for USDT' })
  @ApiResponse({ status: 200, type: Number })
  getRtpDivider_USDT(): Promise<number> {
    return this.diceService.getRtpDivider_USDT();
  }

  @Get('/min-bet')
  @ApiOperation({ title: 'Get a minimal bet for USDT' })
  @ApiResponse({ status: 200, type: Number })
  getMinBet_USDT(): Promise<number> {
    return this.diceService.getMinBet_USDT();
  }

  @Get('/max-bet')
  @ApiOperation({ title: 'Get a maximal bet for USDT' })
  @ApiResponse({ status: 200, type: Number })
  getMaxBet_USDT(): Promise<number> {
    return this.diceService.getMaxBet_USDT();
  }

  @Get('/contract-balance')
  @ApiOperation({ title: 'Get contract balance' })
  @ApiResponse({ status: 200, type: Number })
  getBalance_USDT(): Promise<number> {
    return this.diceService.getBalance_USDT();
  }

  @Get('/game')
  @ApiOperation({ title: 'Get game by hash server seed for USDT' })
  @ApiResponse({ status: 200, type: GetGameResponseDto })
  getGame_USDT(@Query() { hashServerSeed }: GetGameDto): Promise<GetGameResponseDto> {
    return this.diceService.getGame_USDT(hashServerSeed);
  }

  @Get('/game-result')
  @ApiOperation({ title: 'Winning number generation using combination of client seed, server seed and shifting operations' })
  @ApiResponse({ status: 200, type: Number })
  getGameResult_USDT(@Query() { clientSeed, serverSeed, rollUnder }: GetResultNumberDto): Promise<number> {
    return this.diceService.getGameResult_USDT(clientSeed, serverSeed, rollUnder);
  }
}
