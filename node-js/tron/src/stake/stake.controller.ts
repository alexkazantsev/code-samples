import { ClassSerializerInterceptor, Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { StakeService } from './stake.service';
import { GetStakedAmountDto } from './dto/get-staked-amount.dto';

@Controller('stake')
@ApiUseTags('stake')
@UseInterceptors(ClassSerializerInterceptor)
export class StakeController {
  constructor(private readonly stakeService: StakeService) {}

  @Get('/scg-token')
  @ApiOperation({ title: 'Get SCG token' })
  @ApiResponse({ status: 200, type: String })
  getScgToken(): Promise<string> {
    return this.stakeService.getScgToken();
  }

  @Get('/usdt-token')
  @ApiOperation({ title: 'Get USDT token' })
  @ApiResponse({ status: 200, type: String })
  getUsdtToken(): Promise<string> {
    return this.stakeService.getUsdtToken();
  }

  @Get('/global-amount')
  @ApiOperation({ title: 'Get global stake amount' })
  @ApiResponse({ status: 200, type: Number })
  getGlobalStakeAmount(): Promise<number> {
    return this.stakeService.getGlobalStakeAmount();
  }

  @Get('/staked-amount')
  @ApiOperation({ title: 'Get staked amount for user' })
  @ApiResponse({ status: 200, type: Number })
  getStakedAmount(@Query() { address }: GetStakedAmountDto): Promise<number> {
    return this.stakeService.getStakedAmount(address);
  }
}
