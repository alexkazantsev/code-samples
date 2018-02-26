import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class Login {

  @IsEmail()
  public email: string;

  @IsNotEmpty()
  public password: string;

}
