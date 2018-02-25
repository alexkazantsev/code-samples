import Boom from 'boom';
import { models } from './../../db';

export default class TaskController {

  static async fetchAll(ctx) {
    ctx.body = await models.task.findAll({
      where: { user_id: ctx.params.user_id },
      include: [models.user]
    });
  }

  static async fetchOne(ctx) {
    const { id, user_id } = ctx.params;
    const task = await models.task.findOne({
      where: { id, user_id },
      include: [models.user]
    });
    if (!task) throw Boom.notFound();
    ctx.body = task;
  }

  static async createUserTask(ctx) {

    const { user_id } = ctx.params;
    const { title, description } = ctx.request.body;
    const user = await models.user.findById(user_id);
    if (!user) throw Boom.notFound('Can\'t find user');

    const task = await models.task.create({ title, description });
    const result = await user.addTask(task);
    ctx.body = task;
  }

  static async remove(ctx) {
    const taks = await models.taks.findById(ctx.params.id);
    if (!task) throw Boom.notFound();

    await taks.destroy();
    ctx.status = 204;
  }

};
