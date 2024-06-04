import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString } from 'class-validator';

export class CreateTournamentDto {
  @ApiProperty({ example: 'Call of Duty League', description: 'The name of the tournament' })
  @IsString()
  name: string;

  @ApiProperty({ example: '2024-06-01', description: 'The start date of the tournament' })
  @IsDateString()
  date: string;
}
