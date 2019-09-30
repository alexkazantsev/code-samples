import { BaseEntity } from '../common/base/base-entity';
import { ApiModelProperty } from '@nestjs/swagger';

export class Task extends BaseEntity<Task> {

  @ApiModelProperty()
  name: string;
}
