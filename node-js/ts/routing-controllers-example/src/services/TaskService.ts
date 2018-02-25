import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { OrmRepository } from 'typeorm-typedi-extensions';

import { User, Task } from './../models';

@Service()
export class TaskService {

  @OrmRepository(Task)
  private readonly taskORMRepository: Repository<Task>;

  public findAll(user: User): Promise<Task[]> {
    return this.taskORMRepository
      .createQueryBuilder()
      .select('*')
      .where({ user: user.id })
      .execute();
  }

  public async create(task: Task): Promise<Task | undefined> {
    await this.taskORMRepository.save(task);
    return task;
  }

  public async removeAll(userId: number | undefined): Promise<boolean | void> {
    if (!userId) return false;
    
    const tasks = await this.taskORMRepository
      .createQueryBuilder()
      .delete()
      .where({ userId })
      .execute();
  }
}
