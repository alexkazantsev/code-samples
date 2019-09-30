import { BadRequestException, Injectable } from '@nestjs/common';
import { Task } from './task.entity';
import { BaseService } from '../common/base/base-service.interface';
import { TaskNotFoundException } from '../common/exceptions/task-not-found.exception';

@Injectable()
export class TaskService implements BaseService<Task> {
  private tasks: Task[] = [];

  async create(data: Partial<Task>): Promise<Task> {
    if (this.tasks.length === 10) {
      throw new BadRequestException('Can\'t create more than 10 tasks.');
    }
    const task = new Task(data);
    this.tasks = [ ...this.tasks, task ];
    return task;
  }

  async deleteById(id: string): Promise<void> {
    this.tasks = this.tasks.filter((t) => t.id !== id);
  }

  async getAll(): Promise<Task[]> {
    return this.tasks;
  }

  async getById(id: string): Promise<Task> {
    const task = this.tasks.find(t => t.id === id);
    if (!task) {
      throw new TaskNotFoundException(id);
    }
    return task;
  }

  async update(id: string, data: Partial<Task>): Promise<Task> {
    await this.getById(id);

    this.tasks = this.tasks.map(t => {
      if (t.id !== id) {
        return t;
      }
      return { ...t, ...data };
    });

    return this.getById(id);
  }
}
