import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';

import { User as ValidatedUser } from './../validation';
import { PasswordService } from './../utils';
import { Wallet, Transaction } from './';

@Entity()
export class User {

  constructor(user?: ValidatedUser) {
    if (!user) return this;

    this.email = user.email;
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.password = PasswordService.saltHashPassword(user.password);
  }

  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public first_name: string;

  @Column()
  public last_name: string;

  @Column({ unique: true })
  public email: string;

  @Column()
  public password: string;

  @OneToOne(type => Wallet, wallet => wallet.user)
  public wallet: Wallet;

  @OneToMany(type => Transaction, transaction => transaction.user)
  public transactions: Transaction[]

}
