import { Body, ClassSerializerInterceptor, Controller, Patch, UseInterceptors } from '@nestjs/common';
import { AdminService } from './admin.service';
import { ApiOperation, ApiUseTags } from '@nestjs/swagger';
import { UpdateMinMaxBetTrxDto } from './dto/update-min-max-bet-trx.dto';
import { UpdatePortalAddressDto } from './dto/update-portal-address.dto';

@Controller('admin/trx')
@ApiUseTags('admin/trx')
@UseInterceptors(ClassSerializerInterceptor)
export class AdminTrxController {
  constructor(private readonly adminService: AdminService) {}

  @Patch('/min-max-bet')
  @ApiOperation({ title: 'Change PTR' })
  updateMinMaxBet_TRX(@Body() { minBet, maxBet }: UpdateMinMaxBetTrxDto): Promise<any> {
    return this.adminService.changeMinMaxBet_TRX(minBet, maxBet);
  }

  @Patch('/portal-address')
  @ApiOperation({ title: 'Update TRX Portal address' })
  updatePortalAddress_TRX(@Body() { address }: UpdatePortalAddressDto): Promise<any> {
    return this.adminService.updatePortalAddress_TRX(address);
  }
}
