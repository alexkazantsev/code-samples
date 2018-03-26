import { Component, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Component()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly photoRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.photoRepository.find();
  }
}
