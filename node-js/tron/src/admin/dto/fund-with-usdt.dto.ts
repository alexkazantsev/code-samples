import { IsNumber, Min } from 'class-validator';

export class FundWithUsdtDto {

  @IsNumber()
  @Min(1)
  amount: number;
}
