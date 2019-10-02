import { Injectable } from '@nestjs/common';
import { TronService } from '../core/tron.service';
import { GameType } from '../common/enums/GameType.enum';

@Injectable()
export class AdminService {
  private readonly tronWeb: any;

  constructor(private readonly tronService: TronService) {
    this.tronWeb = this.tronService.getTronWeb();
  }

  private async getServerSeedHash(serverSeed: string): Promise<any> {
    const portal = await this.tronService.getPortalContract();
    return portal.getServerSeedHash(serverSeed).call();
  }

  async getSaleAgent(): Promise<string> {
    const scgContract = await this.tronService.getSCGContract();
    return this.tronWeb.address.fromHex(await scgContract.saleAgent().call());
  }

  async setSaleAgent(address: string): Promise<string> {
    const scgContract = await this.tronService.getSCGContract();
    return scgContract.setSaleAgent(address).send();
  }

  async setDiceTRXContract(address: string): Promise<string> {
    const portal = await this.tronService.getPortalContract();

    await portal.setDiceTRXContract(address).send();
    return this.tronWeb.address.fromHex(await portal.diceTRXContract.call());
  }

  async setMainStatus(status: boolean): Promise<boolean> {
    const portal = await this.tronService.getPortalContract();

    return portal.setMainStatus(status).send();
  }

  async changeRTP_TRX(rtp: number, rtpDriver: number): Promise<void> {
    const trx = await this.tronService.getTRXContract();

    return trx.changeRTP(rtp, rtpDriver).send();
  }

  async changeMinMaxBet_TRX(minBet: number, maxBet: number): Promise<void> {
    const trx = await this.tronService.getTRXContract();

    return trx.changeMinMaxBet(minBet, maxBet).send();
  }

  async changeMinMaxBet_USDT(minBet: number, maxBet: number, tokenId: number): Promise<void> {
    const usdt = await this.tronService.getUSDTContract();

    return usdt.changeMinMaxBet(minBet, maxBet, tokenId).send();
  }

  async updatePortalAddress_TRX(address: string): Promise<void> {
    const trx = await this.tronService.getTRXContract();

    return trx.updatePortalAddress(address).send();
  }

  async updatePortalAddress_USDT(address: string): Promise<void> {
    const usdt = await this.tronService.getUSDTContract();

    return usdt.updatePortalAddress(address).send();
  }

  async addToken_USDT(address: string, minBet: number, maxBet: number): Promise<void> {
    const usdt = await this.tronService.getUSDTContract();

    return usdt.addToken(address, minBet, maxBet).send();
  }

  async fundWith_USDT(amount: number): Promise<void> {
    const stake = await this.tronService.getStakingContract();

    return stake.fundWithUsdtForAdmin(amount).send();
  }

  async withdraw_USDT(amount: number): Promise<void> {
    const stake = await this.tronService.getStakingContract();

    return stake.withdrawUsdtForAdmin(amount).send();
  }

  async withdraw_TRX(amount: number): Promise<void> {
    const stake = await this.tronService.getStakingContract();

    return stake.withdrawTrxForAdmin(amount).send();
  }

  async updateTokenAddress_SCG(address: string): Promise<void> {
    const stake = await this.tronService.getStakingContract();

    return stake.updateScgTokenAddress(address).send();
  }

  async updateTokenAddress_USDT(address: string): Promise<void> {
    const stake = await this.tronService.getStakingContract();

    return stake.updateUsdtTokenAddress(address).send();
  }

  async initGame(serverSeed: string, gameType: GameType): Promise<any> {
    await this.setMainStatus(true);
    const contract = await this.tronService.getDiceByType(gameType);

    const serverHash = await this.getServerSeedHash(serverSeed);
    return contract.initGame(serverHash).send();
  }

  async finishGame(serverSeed: string, gameType: GameType): Promise<any> {
    const serverHash = await this.getServerSeedHash(serverSeed);
    const contract = await this.tronService.getDiceByType(gameType);
    return contract.finishGame(serverSeed, serverHash).send();
  }
}
