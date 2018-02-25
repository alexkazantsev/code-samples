import { IsString, IsNotEmpty } from 'class-validator';

export class UserRequest {

  @IsString()
  @IsNotEmpty()
  public first_name: string;

  @IsString()
  @IsNotEmpty()
  public last_name: string;

}
