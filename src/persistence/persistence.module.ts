// src/persistence/persistence.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { typeOrmConfig } from './db-config';
import { Player } from 'src/domain/entities/player.entity';
import { Tournament } from 'src/domain/entities/tournament.entity';
import { Result } from 'src/domain/entities/resault.entity';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: typeOrmConfig,
        }),
        TypeOrmModule.forFeature([Player, Tournament, Result]),
    ],
    exports: [TypeOrmModule],
})
export class PersistenceModule {}
