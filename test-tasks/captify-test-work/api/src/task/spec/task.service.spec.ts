import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from '../task.service';
import { Task } from '../task.entity';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ TaskService ],
    }).compile();

    service = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('tasks should be defined', async () => {
    const tasks = await service.getAll();
    expect(tasks).toBeInstanceOf(Array);
  });

  describe('Tasks CRUD', () => {
    let task;

    beforeEach(async () => {
      task = await service.create({ name: 'foo' });
    });

    it('should create a new task', async () => {
      const tasks = await service.getAll();
      expect(tasks.length).toEqual(1);
    });

    it('name should be exist', async () => {
      const { name } = await service.getById(task.id);
      expect(name).toEqual('foo');
    });

    it('id should be exists', async () => {
      const { id } = await service.getById(task.id);
      expect(id).toEqual(task.id);
    });

    it('should throw a limit error', async () => {

      /**
       * FILL OF TASKS UP TO 10
       */
      await Promise.all(
        Array(9)
          .fill(new Task({ name: 'bar' }))
          .map(t => service.create(t)),
      );

      const result = await service.create({ name: 'bar' }).catch(e => e);
      expect(result).toBeInstanceOf(Error);
      expect(result.message.statusCode).toEqual(400);
      expect(result.message.message).toEqual('Can\'t create more than 10 tasks.');
    });

    it('should delete task by id', async () => {
      await service.deleteById(task.id);
      const tasks = await service.getAll();
      expect(tasks.length).toEqual(0);
    });

    it('should fetch task by id', async () => {
      const t = await service.getById(task.id);
      expect(t.id).toEqual(task.id);
    });

    it('should update task by id', async () => {
      await service.update(task.id, { name: 'baz' });
      const { name } = await service.getById(task.id);
      expect(name).toEqual('baz');
    });
  });
});
