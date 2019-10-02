import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateTokenAddressDto {

  @IsString()
  @IsNotEmpty()
  address: string;
}
