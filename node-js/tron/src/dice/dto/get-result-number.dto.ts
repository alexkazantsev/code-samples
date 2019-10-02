import { IsBooleanString, IsNotEmpty, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class GetResultNumberDto {

  @IsString()
  @IsNotEmpty()
  @ApiModelProperty({ required: true })
  clientSeed: string;

  @IsString()
  @IsNotEmpty()
  @ApiModelProperty({ required: true })
  serverSeed: string;

  @IsBooleanString()
  @IsNotEmpty()
  @ApiModelProperty({ required: true })
  rollUnder: boolean;
}
