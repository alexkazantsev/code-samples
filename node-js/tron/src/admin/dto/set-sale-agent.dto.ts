import { IsNotEmpty, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class SetSaleAgentDto {

  @IsString()
  @IsNotEmpty()
  @ApiModelProperty({ required: true })
  address: string;
}
