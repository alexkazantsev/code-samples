import { Body, ClassSerializerInterceptor, Controller, Patch, Post, Put, UseInterceptors } from '@nestjs/common';
import { AdminService } from './admin.service';
import { ApiOperation, ApiUseTags } from '@nestjs/swagger';
import { FundWithUsdtDto } from './dto/fund-with-usdt.dto';
import { UpdateTokenAddressDto } from './dto/update-token-address.dto';

@Controller('admin/stake')
@ApiUseTags('admin/stake')
@UseInterceptors(ClassSerializerInterceptor)
export class AdminStakeController {
  constructor(private readonly adminService: AdminService) {}

  @Put('/usdt/fund-with')
  @ApiOperation({ title: '@todo(alex_kazantsev)' })
  fundWith(@Body() { amount }: FundWithUsdtDto): Promise<any> {
    return this.adminService.fundWith_USDT(amount);
  }

  @Post('/usdt/withdraw')
  @ApiOperation({ title: '@todo(alex_kazantsev)' })
  withdraw_USDT(@Body() { amount }: FundWithUsdtDto): Promise<any> {
    return this.adminService.withdraw_USDT(amount);
  }

  @Post('/trx/withdraw')
  @ApiOperation({ title: '@todo(alex_kazantsev)' })
  withdraw_TRX(@Body() { amount }: FundWithUsdtDto): Promise<any> {
    return this.adminService.withdraw_TRX(amount);
  }

  @Patch('/scg/token-address')
  @ApiOperation({ title: '@todo(alex_kazantsev)' })
  updateTokenAddress_SCG(@Body() { address }: UpdateTokenAddressDto): Promise<any> {
    return this.adminService.updateTokenAddress_SCG(address);
  }

  @Patch('/usdt/token-address')
  @ApiOperation({ title: '@todo(alex_kazantsev)' })
  updateTokenAddress_USDT(@Body() { address }: UpdateTokenAddressDto): Promise<any> {
    return this.adminService.updateTokenAddress_USDT(address);
  }
}
