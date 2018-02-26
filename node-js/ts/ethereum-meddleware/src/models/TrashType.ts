import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class TrashType {

  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

}
