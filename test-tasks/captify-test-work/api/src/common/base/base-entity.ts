import { v4 } from 'uuid';
import { ApiModelProperty } from '@nestjs/swagger';

export abstract class BaseEntity<T> {
  constructor(partial: Partial<T>) {
    Object.assign(this, partial);
  }

  @ApiModelProperty()
  id: string = v4();
}
