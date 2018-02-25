import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './';

@Entity()
export class Task {

  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public title: string;

  @Column()
  public description: string;

  @ManyToOne(type => User, user => user.tasks, { nullable: false })
  public user?: User;

  public constructor(task: Task = {} as Task) {
    const { title, description, user } = task;
    this.title = title;
    this.description = description;
    this.user = user;
  }
}
