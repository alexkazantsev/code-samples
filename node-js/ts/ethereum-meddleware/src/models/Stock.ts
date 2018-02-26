import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany
} from 'typeorm';

import { Transaction } from './'

@Entity()
export class Stock {

  constructor(stock: any) {
    this.phone = stock.phone;
    this.address = stock.address;
    this.hours = stock.hours;
    this.details = stock.details;
  }

  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public phone: number;

  @Column()
  public address: string;

  @Column()
  public hours: string;

  @Column()
  public details: string;

  @OneToMany(type => Transaction, transaction => transaction.stock)
  public transactions: Transaction[]

}
