import { Injectable } from '@nestjs/common';
import { TronService } from '../core/tron.service';
import { GetGameResponseDto } from './dto/get-game-response.dto';

@Injectable()
export class DiceService {
  private tronWeb: any;

  constructor(private readonly tronService: TronService) {
    this.tronWeb = tronService.getTronWeb();
  }

  async getRtp_TRX(): Promise<number> {
    const contract = await this.tronService.getTRXContract();
    return contract.rtp().call();
  }

  async getRtp_USDT(): Promise<number> {
    const contract = await this.tronService.getUSDTContract();
    return contract.rtp().call();
  }

  async getRtpDivider_TRX(): Promise<number> {
    const contract = await this.tronService.getTRXContract();
    return contract.rtpDivider().call();
  }

  async getRtpDivider_USDT(): Promise<number> {
    const contract = await this.tronService.getUSDTContract();
    return contract.rtpDivider().call();
  }

  async getMinBet_TRX(): Promise<number> {
    const contract = await this.tronService.getTRXContract();
    return (await contract.minBet().call()).toNumber();
  }

  async getMinBet_USDT(): Promise<number> {
    const contract = await this.tronService.getUSDTContract();
    return (await contract.minBet().call()).toNumber();
  }

  async getMaxBet_TRX(): Promise<number> {
    const contract = await this.tronService.getTRXContract();
    return (await contract.maxBet().call()).toNumber();
  }

  async getMaxBet_USDT(): Promise<number> {
    const contract = await this.tronService.getUSDTContract();
    return (await contract.maxBet().call()).toNumber();
  }

  async getGame_TRX(hashServerSeed: string): Promise<GetGameResponseDto> {
    const contract = await this.tronService.getTRXContract();
    return contract.getGame(hashServerSeed).call();
  }

  async getGame_USDT(hashServerSeed: string): Promise<GetGameResponseDto> {
    const contract = await this.tronService.getUSDTContract();
    return contract.getGame(hashServerSeed).call();
  }

  async getBalance_TRX(): Promise<number> {
    const contract = await this.tronService.getTRXContract();
    return (await contract.getBalance().call()).toNumber();
  }

  async getBalance_USDT(): Promise<number> {
    const contract = await this.tronService.getUSDTContract();
    return (await contract.getBalance().call()).toNumber();
  }

  async getGameResult_TRX(clientSeed: string, serverSeed: string, rollUnder: boolean): Promise<number> {
    const contract = await this.tronService.getTRXContract();
    return (await contract.getResultNumber(clientSeed, serverSeed, rollUnder).call()).toNumber();
  }

  async getGameResult_USDT(clientSeed: string, serverSeed: string, rollUnder: boolean): Promise<number> {
    const contract = await this.tronService.getUSDTContract();
    return (await contract.getResultNumber(clientSeed, serverSeed, rollUnder).call()).toNumber();
  }

}
