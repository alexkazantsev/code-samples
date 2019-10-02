import { Body, ClassSerializerInterceptor, Controller, Get, Patch, Post, UseInterceptors } from '@nestjs/common';
import { AdminService } from './admin.service';
import { ApiOperation, ApiUseTags } from '@nestjs/swagger';
import { SetDiceTrxContractAddressDto } from './dto/set-dice-trx-contract-address.dto';
import { SetMainStatusDto } from './dto/set-main-status.dto';
import { ChangePtrDto } from './dto/change-ptr.dto';
import { SetSaleAgentDto } from './dto/set-sale-agent.dto';

@Controller('admin/main')
@ApiUseTags('admin/main')
@UseInterceptors(ClassSerializerInterceptor)
export class AdminMainController {
  constructor(private readonly adminService: AdminService) {}

  @Get('/sale-agent')
  @ApiOperation({ title: 'Get sale agent id' })
  getSaleAgent(): Promise<string> {
    return this.adminService.getSaleAgent();
  }

  @Post('/set-sale-agent')
  @ApiOperation({ title: 'Set SCG sale agent' })
  setSaleAgent(@Body() { address }: SetSaleAgentDto): Promise<string> {
    return this.adminService.setSaleAgent(address);
  }

  @Post('/set-dice-trx-contract-address')
  @ApiOperation({ title: 'Get sale agent id' })
  setDiceTRXAddress(@Body() { address }: SetDiceTrxContractAddressDto): Promise<string> {
    return this.adminService.setDiceTRXContract(address);
  }

  @Post('/main-status')
  @ApiOperation({ title: 'Set main status' })
  setMainStatus(@Body() { status }: SetMainStatusDto): Promise<any> {
    return this.adminService.setMainStatus(status);
  }

  @Patch('/change-ptr')
  @ApiOperation({ title: 'Change PTR' })
  updateRTP(@Body() { rtp, rtpDriver }: ChangePtrDto): Promise<any> {
    return this.adminService.changeRTP_TRX(rtp, rtpDriver);
  }
}
