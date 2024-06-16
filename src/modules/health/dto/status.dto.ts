import { ApiProperty } from '@nestjs/swagger';

export class StatusResponse {
  @ApiProperty({
    example: 'running',
  })
    status: string;

  @ApiProperty({
    example: 23.242322,
  })
    uptime: number;
}
