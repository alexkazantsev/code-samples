import { IsNotEmpty, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class InitGameDto {
  @IsString()
  @IsNotEmpty()
  @ApiModelProperty({ required: true })
  hashServerSeed: string;
}
