import {
  JsonController,
  Post,
  Get,
  Delete,
  Param,
  CurrentUser,
  Body,
  HttpCode,
} from 'routing-controllers';

import { User, Task } from './../models';
import { UserService, TaskService } from './../services';
import { TaskRequest } from './../requests';

@JsonController('/user/:id/task')
export class UserController {

  constructor(private readonly taskService: TaskService) { }

  @Get('/')
  public fetchAll( @CurrentUser({ required: true }) user: User) {
    return this.taskService.findAll(user);
  }

  @Post('/')
  public create(
    @CurrentUser({ required: true }) user: User,
    @Body({ required: true }) taskRequest: TaskRequest
    ) {
    return this.taskService.create(new Task({ ...taskRequest, user }));
  }

  @Delete('/')
  @HttpCode(204)
  public async remove( @CurrentUser({ required: true }) user: User) {
    await this.taskService.removeAll(user.id);
    return true;
  }

}
