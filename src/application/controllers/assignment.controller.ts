// src/application/controllers/assignment.controller.ts
import { Controller, Post, Param } from '@nestjs/common';
import { TournamentService } from '../services/tournament.service';

@Controller('tournaments')
export class AssignmentController {
  constructor(private readonly tournamentService: TournamentService) {}

  @Post(':id/assignment')
  async createRandomAssignment(@Param('id') tournamentId: string) {
    return this.tournamentService.createRandomAssignment(+tournamentId);
  }
}
