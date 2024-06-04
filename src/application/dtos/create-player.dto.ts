import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePlayerDto {
  @ApiProperty({ example: 'John Doe', description: 'The name of the player' })
  @IsString()
  name: string;
}
