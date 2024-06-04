import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayersController } from '../controllers/player.controller';
import { PlayerService } from '../services/player.service';
import { Player } from 'src/domain/entities/player.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Player])],
  controllers: [PlayersController],
  providers: [PlayerService],
})
export class PlayerModule {}
