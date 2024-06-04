// src/application/controllers/result.controller.ts
import { Controller, Get, Param, Post, Body, Query } from '@nestjs/common';
import { ResultService } from '../services/result.service';
import { CreateResultDto } from '../dtos/create-result.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('results')
@Controller('results')
export class ResultController {
  constructor(private readonly resultService: ResultService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new result' })
  @ApiResponse({ status: 201, description: 'The result has been successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  create(@Body() createResultDto: CreateResultDto) {
    return this.resultService.createResult(createResultDto);
  }

  @Get(':tournamentId')
  findByTournament(
    @Param('tournamentId') tournamentId: string,
    @Query('minPoints') minPoints: number,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('orderBy') orderBy = 'winnerPoints',
  ) {
    return this.resultService.getResultsByTournament(
      +tournamentId,
      minPoints,
      { page, limit, orderBy },
    );
  }
}
