import { ApiModelProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class StartGameDto {

  @IsString()
  @IsNotEmpty()
  @ApiModelProperty({ required: true })
  hashServerSeed: string;

  @IsString()
  @IsNotEmpty()
  @ApiModelProperty({ required: true })
  userSubmittedValue: string;

  @IsString()
  @IsNotEmpty()
  @ApiModelProperty({ required: true })
  submitterAddress: string;

  @IsNumber()
  @Min(1)
  @ApiModelProperty({ required: true })
  number: number;

  @IsBoolean()
  @ApiModelProperty({ required: true })
  rollUnder: boolean;
}
