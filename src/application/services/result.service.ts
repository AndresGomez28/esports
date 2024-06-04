// src/application/services/result.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Result } from 'src/domain/entities/resault.entity';
import { CreateResultDto } from 'src/application/dtos/create-result.dto';

@Injectable()
export class ResultService {
  constructor(
    @InjectRepository(Result)
    private resultRepository: Repository<Result>,
  ) {}

  async createResult(createResultDto: CreateResultDto): Promise<Result> {
    const result = this.resultRepository.create(createResultDto);
    return this.resultRepository.save(result);
  }

  async getResultsByTournament(
    tournamentId: number,
    minPoints: number,
    options: { page: number, limit: number, orderBy: string },
  ): Promise<Result[]> {
    const { page, limit, orderBy } = options;
    const queryBuilder = this.resultRepository.createQueryBuilder('result');

    queryBuilder.where('result.tournamentId = :tournamentId', { tournamentId });

    if (minPoints) {
      queryBuilder.andWhere('result.winnerPoints >= :minPoints OR result.looserPoints >= :minPoints', { minPoints });
    }

    queryBuilder.orderBy(`result.${orderBy}`, 'DESC');
    queryBuilder.skip((page - 1) * limit);
    queryBuilder.take(limit);

    return queryBuilder.getMany();
  }
}
