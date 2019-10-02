import { Body, ClassSerializerInterceptor, Controller, Patch, Put, UseInterceptors } from '@nestjs/common';
import { AdminService } from './admin.service';
import { ApiOperation, ApiUseTags } from '@nestjs/swagger';
import { UpdatePortalAddressDto } from './dto/update-portal-address.dto';
import { UpdateMinMaxBetUsdtDto } from './dto/update-min-max-bet-usdt.dto';
import { AddTokenUsdtDto } from './dto/add-token-usdt.dto';

@Controller('admin/usdt')
@ApiUseTags('admin/usdt')
@UseInterceptors(ClassSerializerInterceptor)
export class AdminUsdtController {
  constructor(private readonly adminService: AdminService) {}

  @Patch('/usdt/min-max-bet')
  @ApiOperation({ title: 'Change PTR' })
  updateMinMaxBet_USDT(@Body() { minBet, maxBet, tokenId }: UpdateMinMaxBetUsdtDto): Promise<any> {
    return this.adminService.changeMinMaxBet_USDT(minBet, maxBet, tokenId);
  }

  @Patch('/portal-address')
  @ApiOperation({ title: 'Update USDT Portal address' })
  updatePortalAddress_USDT(@Body() { address }: UpdatePortalAddressDto): Promise<any> {
    return this.adminService.updatePortalAddress_USDT(address);
  }

  @Put('/add-token')
  @ApiOperation({ title: 'Update USDT Portal address' })
  addToken_USDT(@Body() { address, minBet, maxBet }: AddTokenUsdtDto): Promise<any> {
    return this.adminService.addToken_USDT(address, minBet, maxBet);
  }
}
