import { IsBoolean } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class SetMainStatusDto {

  @IsBoolean()
  @ApiModelProperty({ required: true })
  status: boolean;
}
