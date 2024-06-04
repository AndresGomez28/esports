import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { PlayerService } from '../services/player.service';
import { CreatePlayerDto } from '../dtos/create-player.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('players')
@Controller('players')
export class PlayersController {
  constructor(private readonly playerService: PlayerService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new player' })
  @ApiResponse({ status: 201, description: 'The player has been successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  create(@Body() createPlayerDto: CreatePlayerDto) {
    return this.playerService.createPlayer(createPlayerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all players' })
  @ApiResponse({ status: 200, description: 'Return all players.' })
  findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return this.playerService.getPlayers({ page, limit });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get player by ID' })
  @ApiResponse({ status: 200, description: 'Return player by ID.' })
  @ApiResponse({ status: 404, description: 'Player not found.' })
  findOne(@Param('id') id: string) {
    return this.playerService.getPlayerById(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update player by ID' })
  @ApiResponse({ status: 200, description: 'The player has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Player not found.' })
  update(@Param('id') id: string, @Body() updatePlayerDto: Partial<CreatePlayerDto>) {
    return this.playerService.updatePlayer(+id, updatePlayerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete player by ID' })
  @ApiResponse({ status: 200, description: 'The player has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Player not found.' })
  remove(@Param('id') id: string) {
    return this.playerService.deletePlayer(+id);
  }
}
