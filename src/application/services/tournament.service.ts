// src/application/services/tournament.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tournament } from 'src/domain/entities/tournament.entity';
import { Player } from 'src/domain/entities/player.entity';
import { CreateTournamentDto } from 'src/application/dtos/create-tournament.dto';
import { UpdateTournamentDto } from 'src/application/dtos/update-tournament.dto';
import { AssignmentService } from './assignment.service';

@Injectable()
export class TournamentService {
  constructor(
    @InjectRepository(Tournament)
    private tournamentRepository: Repository<Tournament>,
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
    private assignmentService: AssignmentService,
  ) {}

  async createTournament(createTournamentDto: CreateTournamentDto): Promise<Tournament> {
    const tournament = this.tournamentRepository.create(createTournamentDto);
    return this.tournamentRepository.save(tournament);
  }

  async updateTournament(id: number, updateTournamentDto: UpdateTournamentDto): Promise<Tournament> {
    await this.tournamentRepository.update(id, updateTournamentDto);
    return this.getTournamentById(id);
  }

  async deleteTournament(id: number): Promise<void> {
    await this.tournamentRepository.delete(id);
  }

  async getTournaments(): Promise<Tournament[]> {
    return this.tournamentRepository.find();
  }

  async getTournamentById(id: number): Promise<Tournament> {
    const tournament = await this.tournamentRepository.findOne({ where: { id }, relations: ['players'] });

    if (!tournament) {
      throw new NotFoundException(`Tournament with ID ${id} not found`);
    }

    return tournament;
  }

  async addParticipantToTournament(tournamentId: number, playerId: number): Promise<void> {
    const tournament = await this.getTournamentById(tournamentId);
    const player = await this.playerRepository.findOne({ where: { id: playerId } });

    if (!player) {
      throw new NotFoundException(`Player with ID ${playerId} not found`);
    }

    tournament.players.push(player);
    await this.tournamentRepository.save(tournament);
  }

  async createRandomAssignment(tournamentId: number): Promise<void> {
    const tournament = await this.getTournamentById(tournamentId);
    await this.assignmentService.createRandomAssignment(tournament);
  }
}
