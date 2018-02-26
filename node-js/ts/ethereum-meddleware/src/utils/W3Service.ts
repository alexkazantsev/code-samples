import * as Web3 from 'web3';
import { Wallet } from './../models';
import {
  ETH_NODE_URL,
  ETH_NODE_PORT,
  ABI,
} from './../config';

export class W3Service {

  private entropy: string = '2435@#@#@±±±±!!!!678543213456764321§34567543213456785432134567';
  private web3: any;
  private wallet: Wallet;

  static ABI: any = ABI;

  constructor(wallet?: Wallet) {
    if (wallet) this.wallet = wallet;
   
    this.web3 = new Web3();
    const provider = new this.web3.providers.HttpProvider(`http://${ETH_NODE_URL}:${ETH_NODE_PORT}`);
    this.web3.setProvider(provider);
  }

  private getAccount(pK: string): any {
    return this.web3.eth.accounts.privateKeyToAccount(pK);
  }

  private fromWei(eth: string): number {
    return parseFloat(this.web3.utils.fromWei(eth, 'ether'));
  }

  public async getBalance(pK: string): Promise<number> {
    const account = this.getAccount(pK);
    const balance = await this.web3.eth.getBalance(account.address);
    return this.fromWei(balance);
  }

  public async createWallet(): Promise<any> {
    return this.web3.eth.accounts.create(this.entropy);
  }

}