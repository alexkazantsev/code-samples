import { DataProvider } from './';

export function InjectConnection<T extends { new (...args: any[]): {} }>(constructor: T) {
  return class extends constructor {
    protected connection = DataProvider.connection;
  };
}
