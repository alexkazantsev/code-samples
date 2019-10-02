import { IsNumber } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class ChangePtrDto {

  @IsNumber()
  @ApiModelProperty({ required: true })
  rtp: number;

  @IsNumber()
  @ApiModelProperty({ required: true })
  rtpDriver: number;
}
