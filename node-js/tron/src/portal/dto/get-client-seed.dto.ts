import { IsNotEmpty, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class GetClientSeedDto {

  @IsString()
  @IsNotEmpty()
  @ApiModelProperty({ required: true })
  userSubmittedValue: string;

  @IsString()
  @IsNotEmpty()
  @ApiModelProperty({ required: true })
  submittedAddress: string;
}
