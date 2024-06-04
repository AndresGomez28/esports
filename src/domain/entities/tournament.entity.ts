import { Entity, PrimaryGeneratedColumn, Column, OneToMany, DeleteDateColumn } from "typeorm";
import { Player } from "./player.entity";
import { Result } from "./resault.entity";

@Entity('tournaments')
export class Tournament {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'timestamp' })
  date: Date;

  @OneToMany(() => Player, player => player.tournament)
  players: Player[];

  @OneToMany(() => Result, result => result.tournament)
  results: Result[];

  @DeleteDateColumn()
  deletedAt?: Date;
}