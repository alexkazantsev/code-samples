import { Injectable } from '@nestjs/common';
import { TronService } from '../core/tron.service';

@Injectable()
export class PortalService {
  private tronWeb: any;

  constructor(private readonly tronService: TronService) {
    this.tronWeb = tronService.getTronWeb();
  }

  async getToken(): Promise<string> {
    const contract = await this.tronService.getPortalContract();
    return contract.token().call();
  }

  async getClientSeed(userSubmittedValue: string, submittedAddress: string): Promise<string> {
    const contract = await this.tronService.getPortalContract();
    return contract.getClientSeed(userSubmittedValue, submittedAddress).call();
  }

  async getServerSeedHash(serverSeed: string): Promise<string> {
    const contract = await this.tronService.getPortalContract();
    return contract.getServerSeedHash(serverSeed).call();
  }

  async getDepositOf(address: string): Promise<number> {
    const contract = await this.tronService.getPortalContract();
    return (await contract.depositOf(address).call()).toNumber();
  }

  async getOwner(): Promise<string> {
    const contract = await this.tronService.getPortalContract();
    return this.tronWeb.address.fromHex(await contract.owner().call());
  }

  async getSaleAgent(): Promise<string> {
    const contract = await this.tronService.getPortalContract();
    return this.tronWeb.address.fromHex(await contract.saleAgent().call());
  }

  async getDiceTRXContract(): Promise<string> {
    const contract = await this.tronService.getPortalContract();
    return this.tronWeb.address.fromHex(await contract.diceTRXContract().call());
  }

  async getMainStatus(): Promise<string> {
    const contract = await this.tronService.getPortalContract();
    return contract.mainStatus().call();
  }
}
