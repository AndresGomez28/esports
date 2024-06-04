import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Tournament } from './tournament.entity';
import { Player } from './player.entity';

@Entity('results')
export class Result {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Tournament, tournament => tournament.results)
  tournament: Tournament;

  @ManyToOne(() => Player, player => player.id)
  winner: Player;

  @ManyToOne(() => Player, player => player.id)
  looser: Player;

  @Column()
  winnerPoints: number;

  @Column()
  looserPoints: number;
}
