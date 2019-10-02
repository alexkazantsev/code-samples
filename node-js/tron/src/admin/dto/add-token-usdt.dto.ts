import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class AddTokenUsdtDto {

  @IsString()
  @IsNotEmpty()
  @ApiModelProperty({ required: true })
  address: string;

  @IsNumber()
  @Min(1)
  @ApiModelProperty({ required: true })
  minBet: number;

  @IsNumber()
  @Min(1)
  @ApiModelProperty({ required: true })
  maxBet: number;
}
