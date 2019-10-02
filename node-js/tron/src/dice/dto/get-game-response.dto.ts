import { ApiModelProperty } from '@nestjs/swagger';

export class GetGameResponseDto {

  @ApiModelProperty()
  serverSeed: string;

  @ApiModelProperty()
  clientSeed: string;
}
