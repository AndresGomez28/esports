import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Tournament } from "./tournament.entity";

@Entity('players')
export class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Tournament, tournament => tournament.players)
  tournament: Tournament;
}