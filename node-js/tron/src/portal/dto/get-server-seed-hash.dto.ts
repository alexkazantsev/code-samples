import { IsNotEmpty, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class GetServerSeedHashDto {

  @IsString()
  @IsNotEmpty()
  @ApiModelProperty({ required: true })
  serverSeed: string;
}
