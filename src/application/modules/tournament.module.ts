import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssignmentModule } from './assignment.module';
import { Tournament } from 'src/domain/entities/tournament.entity';
import { Player } from 'src/domain/entities/player.entity';
import { Result } from 'src/domain/entities/resault.entity';
import { TournamentService } from '../services/tournament.service';
import { TournamentController } from '../controllers/tournament.controller';
import { AssignmentController } from '../controllers/assignment.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tournament, Player, Result]),
    AssignmentModule,
  ],
  controllers: [TournamentController, AssignmentController],
  providers: [TournamentService],
})
export class TournamentModule {}
