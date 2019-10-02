import { ClassSerializerInterceptor, Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { PortalService } from './portal.service';
import { GetClientSeedDto } from './dto/get-client-seed.dto';
import { GetServerSeedHashDto } from './dto/get-server-seed-hash.dto';
import { GetDepositOfDto } from './dto/get-deposit-of.dto';

@Controller('portal')
@ApiUseTags('portal')
@UseInterceptors(ClassSerializerInterceptor)
export class PortalController {
  constructor(private readonly portalService: PortalService) {}

  @Get('/token')
  @ApiOperation({ title: 'Get token' })
  @ApiResponse({ status: 200, type: String })
  getRtp(): Promise<string> {
    return this.portalService.getToken();
  }

  @Get('/client-seed')
  @ApiOperation({ title: 'Get client seed' })
  @ApiResponse({ status: 200, type: String })
  getClientSeed(@Query() { userSubmittedValue, submittedAddress }: GetClientSeedDto): Promise<string> {
    return this.portalService.getClientSeed(userSubmittedValue, submittedAddress);
  }

  @Get('/server-hash-seed')
  @ApiOperation({ title: 'Get server seed hash' })
  @ApiResponse({ status: 200, type: String })
  getServerSeedHash(@Query() { serverSeed }: GetServerSeedHashDto): Promise<string> {
    return this.portalService.getServerSeedHash(serverSeed);
  }

  @Get('/deposit-of')
  @ApiOperation({ title: 'Get deposit of contract' })
  @ApiResponse({ status: 200, type: Number })
  getDepositOf(@Query() { address }: GetDepositOfDto): Promise<number> {
    return this.portalService.getDepositOf(address);
  }

  @Get('/owner')
  @ApiOperation({ title: 'Get portal owner' })
  @ApiResponse({ status: 200, type: Number })
  getOwner(): Promise<string> {
    return this.portalService.getOwner();
  }

  @Get('/sale-agent')
  @ApiOperation({ title: 'Get portal owner' })
  @ApiResponse({ status: 200, type: Number })
  getSaleAgent(): Promise<string> {
    return this.portalService.getSaleAgent();
  }

  @Get('/dice-trx-contract')
  @ApiOperation({ title: 'Get dice TRX contract address' })
  @ApiResponse({ status: 200, type: String })
  getDiceTRXContract(): Promise<string> {
    return this.portalService.getDiceTRXContract();
  }

  @Get('/main-status')
  @ApiOperation({ title: 'Get main status' })
  @ApiResponse({ status: 200, type: Number })
  getMainStatus(): Promise<string> {
    return this.portalService.getMainStatus();
  }
}
