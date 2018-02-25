import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import { Task } from './';

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public first_name?: string;

  @Column()
  public last_name?: string;

  @OneToMany(
    type => Task, 
    task => task.user, 
    { cascadeUpdate: true, cascadeInsert: true }
  )
  @JoinColumn()
  tasks?: Task[] = [];

  constructor(user: User = {} as User) {
    const { first_name, last_name, tasks } = user;
    this.first_name = first_name;
    this.last_name = last_name;
    this.tasks = tasks;
  }

  public update(data: User = {} as User): void {
    this.first_name = data.first_name;
    this.last_name = data.last_name;
  }
}
