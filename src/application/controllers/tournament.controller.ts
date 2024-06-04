import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { TournamentService } from '../services/tournament.service';
import { CreateTournamentDto } from '../dtos/create-tournament.dto';
import { UpdateTournamentDto } from '../dtos/update-tournament.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('tournaments')
export class TournamentController {
  constructor(private readonly tournamentService: TournamentService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new tournament' })
  @ApiResponse({ status: 201, description: 'The tournament has been successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  create(@Body() createTorneoDto: CreateTournamentDto) {
    return this.tournamentService.createTournament(createTorneoDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update tournament by ID' })
  @ApiResponse({ status: 200, description: 'The tournament has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Tournament not found.' })
  update(@Param('id') id: string, @Body() updateTournamentDto: UpdateTournamentDto) {
    return this.tournamentService.updateTournament(+id, updateTournamentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete tournament by ID' })
  @ApiResponse({ status: 200, description: 'The tournament has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Tournament not found.' })
  remove(@Param('id') id: string) {
    return this.tournamentService.deleteTournament(+id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tournaments' })
  @ApiResponse({ status: 200, description: 'Return all tournaments.' })
  findAll() {
    return this.tournamentService.getTournaments();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get tournament by ID' })
  @ApiResponse({ status: 200, description: 'Return tournament by ID.' })
  @ApiResponse({ status: 404, description: 'Tournament not found.' })
  findOne(@Param('id') id: string) {
    return this.tournamentService.getTournamentById(+id);
  }

  @Post(':id/players/:playerId')
  addPlayerToTournament(@Param('id') tournamentId: string, @Param('playerId') playerId: string) {
    return this.tournamentService.addParticipantToTournament(+tournamentId, +playerId);
  }

  @Post(':id/assignment')
  createRandomAssignment(@Param('id') tournamentId: string) {
    return this.tournamentService.createRandomAssignment(+tournamentId);
  }
}
