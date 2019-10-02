/* tslint:disable:no-var-requires */
import { GameType } from '../common/enums/GameType.enum';
import { Injectable } from '@nestjs/common';
import { PRIVATE_KEY_SHASTA } from '../config';
import diceTrxABI from '../common/abi/DiceTRX.json';
import diceUsdtABI from '../common/abi/DiceUSDT.json';
import portalABI from '../common/abi/Portal.json';
import stakingABI from '../common/abi/Staking.json';
import scgABI from '../common/abi/SCG.json';

const TronWeb = require('tronweb/dist/TronWeb.node.js');

@Injectable()
export class TronService {
  private readonly HttpProvider: any = TronWeb.providers.HttpProvider;
  private readonly eventServer = 'https://api.shasta.trongrid.io';

  private readonly DICE_TRX_CONTRACT_ID = '';
  private readonly DICE_USDT_CONTRACT_ID = '';
  private readonly PORTAL_CONTRACT_ID = '';
  private readonly SCG_CONTRACT_ID = '';
  private readonly STAKING_CONTRACT_ID = '';

  private readonly tronWeb: any;

  constructor() {
    const HttpProvider = TronWeb.providers.HttpProvider;
    const fullNode = new HttpProvider(this.eventServer);
    const solidityNode = new HttpProvider(this.eventServer);

    this.tronWeb = new TronWeb({
      fullNode,
      solidityNode,
      eventServer: this.eventServer,
      privateKey: PRIVATE_KEY_SHASTA,
    });
  }

  getTronWeb(): any {
    return this.tronWeb;
  }

  getDiceByType(type: GameType): Promise<any> {
    if (type === GameType.DICE_TRX) {
      return this.getTRXContract();
    }
    return this.getUSDTContract();
  }

  async getTRXContract(): Promise<any> {
    return this.tronWeb
      .contract(diceTrxABI.abi)
      .at(this.DICE_TRX_CONTRACT_ID);
  }

  async getPortalContract(): Promise<any> {
    return this.tronWeb
      .contract(portalABI.abi)
      .at(this.PORTAL_CONTRACT_ID);
  }

  async getSCGContract(): Promise<any> {
    return this.tronWeb
      .contract(scgABI.abi)
      .at(this.SCG_CONTRACT_ID);
  }

  async getStakingContract(): Promise<any> {
    return this.tronWeb
      .contract(stakingABI.abi)
      .at(this.STAKING_CONTRACT_ID);
  }

  async getUSDTContract(): Promise<any> {
    return this.tronWeb
      .contract(diceUsdtABI.abi)
      .at(this.DICE_USDT_CONTRACT_ID);
  }
}
