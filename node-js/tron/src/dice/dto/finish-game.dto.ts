import { IsNotEmpty, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class FinishGameDto {

  @IsString()
  @IsNotEmpty()
  @ApiModelProperty({ required: true })
  serverSeed: string;
}
