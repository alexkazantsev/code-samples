import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { User as ValidatedUser } from './../validation';
import { User } from './';
import { PasswordService } from './../utils';

@Entity()
export class Wallet {

  constructor(user: User, key: string) {
    this.user = user;
    this.key = key;
  }

  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public key: string;

  @OneToOne(type => User)
  @JoinColumn()
  public user: User;

}
