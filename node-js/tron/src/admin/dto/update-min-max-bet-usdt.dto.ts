import { IsNumber, Min } from 'class-validator';
import { UpdateMinMaxBetTrxDto } from './update-min-max-bet-trx.dto';

export class UpdateMinMaxBetUsdtDto extends UpdateMinMaxBetTrxDto {

  @IsNumber()
  @Min(1)
  tokenId: number;
}
