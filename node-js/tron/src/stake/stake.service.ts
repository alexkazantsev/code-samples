import { Injectable } from '@nestjs/common';
import { TronService } from '../core/tron.service';

@Injectable()
export class StakeService {
  private tronWeb: any;

  constructor(private readonly tronService: TronService) {
    this.tronWeb = tronService.getTronWeb();
  }

  async getScgToken(): Promise<string> {
    const contract = await this.tronService.getStakingContract();
    return contract.scgToken.call();
  }

  async getUsdtToken(): Promise<string> {
    const contract = await this.tronService.getStakingContract();
    return contract.usdtToken.call();
  }

  async getGlobalStakeAmount(): Promise<number> {
    const contract = await this.tronService.getStakingContract();
    return (await contract.getGlobalStakeAmount().call()).toNumber();
  }

  async getStakedAmount(address: string): Promise<number> {
    const contract = await this.tronService.getStakingContract();
    return (await contract.getStakedAmount(address).call()).toNumber();
  }
}
