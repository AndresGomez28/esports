import { IsNumber } from 'class-validator';

export class CreateResultDto {
  @IsNumber()
  tournamentId: number;

  @IsNumber()
  winnerId: number;

  @IsNumber()
  looserId: number;

  @IsNumber()
  winnerPoints: number;

  @IsNumber()
  looserPoints: number;
}
