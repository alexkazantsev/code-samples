import { Body, ClassSerializerInterceptor, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { TaskService } from './task.service';
import { Task } from './task.entity';
import { TaskDto } from './dto/task.dto';

@Controller('task')
@ApiUseTags('task')
@UseInterceptors(ClassSerializerInterceptor)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  @ApiOperation({ title: 'Fetch all tasks' })
  @ApiResponse({ status: 200, type: Task, isArray: true })
  getAll(): Promise<Task[]> {
    return this.taskService.getAll();
  }

  @Get('/:id')
  @ApiOperation({ title: 'Fetch a single task by given id' })
  @ApiResponse({ status: 200, type: Task })
  getById(@Param('id') id: string): Promise<Task> {
    return this.taskService.getById(id);
  }

  @Post()
  @HttpCode(201)
  @ApiOperation({ title: 'Create a new task' })
  @ApiResponse({ status: 201, type: Task })
  create(@Body() task: TaskDto): Promise<Task> {
    return this.taskService.create(task);
  }

  @Put('/:id')
  @HttpCode(204)
  @ApiOperation({ title: 'Update task by given id' })
  update(
    @Param('id') id: string,
    @Body() task: TaskDto,
  ): Promise<Task> {
    return this.taskService.update(id, task);
  }

  @Delete('/:id')
  @HttpCode(204)
  @ApiOperation({ title: 'Delete task by given id' })
  remove(@Param('id') id: string): Promise<void> {
    return this.taskService.deleteById(id);
  }
}
