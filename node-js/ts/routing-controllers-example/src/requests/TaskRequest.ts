import { IsString, IsNotEmpty } from 'class-validator';

export class TaskRequest {

  @IsString()
  @IsNotEmpty()
  public title: string;

  @IsString()
  @IsNotEmpty()
  public description: string;

}
