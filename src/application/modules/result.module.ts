import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Result } from 'src/domain/entities/resault.entity';
import { ResultController } from '../controllers/result.controller';
import { ResultService } from '../services/result.service';

@Module({
  imports: [TypeOrmModule.forFeature([Result])],
  controllers: [ResultController],
  providers: [ResultService],
})
export class ResultModule {}
