import { AxiosInstance } from 'axios';
import { Connection, Repository } from 'typeorm';
import { InjectConnection, InjectRepositories } from './../utils';
import { User, Wallet, Stock, Transaction, TrashType } from './../models';

@InjectConnection
@InjectRepositories
export class BaseController {
  public request: AxiosInstance;
  public connection: Connection;
  public userRepository: Repository<User>;
  public walletRepository: Repository<Wallet>;
  public stockRepository: Repository<Stock>;
  public transactionRepository: Repository<Transaction>;
  public trashTypeRepository: Repository<TrashType>;
}
