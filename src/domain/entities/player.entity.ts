// src/domain/entities/player.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Tournament } from './tournament.entity';
import { Result } from './resault.entity';

@Entity()
export class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Tournament, tournament => tournament.players)
  tournament: Tournament[];

  @OneToMany(() => Result, result => result.winner)
  wins: Result[];

  @OneToMany(() => Result, result => result.looser)
  losses: Result[];
}
