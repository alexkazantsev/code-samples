import {
  JsonController,
  Get,
  Post,
  Put,
  Delete,
  Param,
  CurrentUser,
  Body,
  HttpCode,
} from 'routing-controllers';

import { User } from './../models';
import { UserService } from './../services';
import { UserRequest } from './../requests';

@JsonController('/user')
export class UserController {

  constructor(private readonly userService: UserService) { }

  @Get('/')
  public async fetchAll() {
    return await this.userService.findAll();
  }

  @Get('/:id')
  public async fetchOne( @Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Post('/')
  public async create( @Body({ required: true }) userRequest: UserRequest) {
    return this.userService.create(new User(<User>userRequest));
  }

  @Put('/:id')
  public async update(
    @CurrentUser({ required: true }) user: User,
    @Body({ required: true }) userRequest: UserRequest
    ) {
    user.update(<User>userRequest);
    return this.userService.update(user);
  }

  @Delete('/:id')
  @HttpCode(204)
  public async remove( @CurrentUser({ required: true }) user: User) {
    await this.userService.remove(user);
    return true;
  }
}
