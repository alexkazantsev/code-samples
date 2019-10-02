import { IsNumber, Min } from 'class-validator';

export class UpdateMinMaxBetTrxDto {

  @IsNumber()
  @Min(1)
  minBet: number;

  @IsNumber()
  @Min(1)
  maxBet: number;
}
