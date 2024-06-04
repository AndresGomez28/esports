import { EntityRepository, Repository } from 'typeorm';
import { Tournament } from '../entities/tournament.entity';

@EntityRepository(Tournament)
export class TournamentRepository extends Repository<Tournament> {}
