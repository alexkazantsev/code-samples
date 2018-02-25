import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { OrmRepository } from 'typeorm-typedi-extensions';

import { User, Task } from './../models';

@Service()
export class UserService {

  @OrmRepository(User)
  private readonly repository: Repository<User>;

  public findAll(): Promise<User[]> {
    return this.repository.find({ relations: ['tasks'] });
  }

  public findOne(id: number): Promise<User | undefined> {
    return this.repository.findOneById(id, { relations: ['tasks'] });
  }

  public create(user: User): Promise<User> {
    return this.repository.save(user);
  }

  public async update(user: User): Promise<User> {
    return this.repository.save(user);
  }

  public remove(user: User): Promise<void> {
    return this.repository.delete({ id: user.id });
  }

}
