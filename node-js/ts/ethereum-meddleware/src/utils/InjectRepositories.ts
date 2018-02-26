import { DataProvider } from './DataProvider';
import { User, Wallet, Stock, Transaction, TrashType } from '../models';

export function InjectRepositories<T extends { new (...args: any[]): {} }>(constructor: T) {
  return class extends constructor {
    protected userRepository = DataProvider.connection.getRepository(User);
    protected walletRepository = DataProvider.connection.getRepository(Wallet);
    protected stockRepository = DataProvider.connection.getRepository(Stock);
    protected transactionRepository = DataProvider.connection.getRepository(Transaction);
    protected trashTypeRepository = DataProvider.connection.getRepository(TrashType);
  };
}
