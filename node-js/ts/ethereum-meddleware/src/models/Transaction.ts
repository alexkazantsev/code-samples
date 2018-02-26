import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne
} from 'typeorm';

import { User, Stock } from './'

@Entity()
export class Transaction {

  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToOne(type => User, user => user.transactions)
  public user: User;

  @ManyToOne(type => Stock, stock => stock.transactions)
  public stock: Stock;

}
