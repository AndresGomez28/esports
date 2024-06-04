// src/application/services/assignment.service.ts
import { Injectable } from '@nestjs/common';
import { Tournament } from 'src/domain/entities/tournament.entity';

@Injectable()
export class AssignmentService {
  async createRandomAssignment(tournament: Tournament): Promise<void> {
    const players = tournament.players;
    const numberOfPlayers = players.length;

    for (let i = numberOfPlayers - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [players[i], players[j]] = [players[j], players[i]];
    }

    for (let i = 0; i < numberOfPlayers; i += 2) {
      const player1 = players[i];
      const player2 = players[i + 1];

      // Create a match or assign player1 and player2 to a match
      // For example, you can create a Match entity and save it to the database
      // You can also update the Tournament entity to reflect the match assignments
    }
  }
}
