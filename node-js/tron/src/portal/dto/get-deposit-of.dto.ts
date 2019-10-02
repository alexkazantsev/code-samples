import { IsNotEmpty, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class GetDepositOfDto {

  @IsString()
  @IsNotEmpty()
  @ApiModelProperty({ required: true })
  address: string;
}
