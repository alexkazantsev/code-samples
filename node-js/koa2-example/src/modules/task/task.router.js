import Router from 'koa-router';

import TaskController from './task.controller';
import { validator } from './../../middleware';
import { crteaTaskSchema } from './schemas';

const router = new Router({ prefix: '/api/user/:user_id/task' });

export default router
  .get('/', TaskController.fetchAll)
  .get('/:id', TaskController.fetchOne)
  .post('/', validator(crteaTaskSchema), TaskController.createUserTask)
  .delete('/:id', TaskController.remove)
  .routes();
