import { IsNotEmpty, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class SetDiceTrxContractAddressDto {
  @IsString()
  @IsNotEmpty()
  @ApiModelProperty({ required: true })
  address: string;
}
