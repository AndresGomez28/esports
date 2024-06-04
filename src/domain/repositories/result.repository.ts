import { EntityRepository, Repository } from 'typeorm';
import { Result } from '../entities/resault.entity';

@EntityRepository(Result)
export class ResultRepository extends Repository<Result> {}
