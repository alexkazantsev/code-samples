import { IsNotEmpty, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class GetGameDto {

  @IsString()
  @IsNotEmpty()
  @ApiModelProperty({ required: true })
  readonly hashServerSeed: string;
}
