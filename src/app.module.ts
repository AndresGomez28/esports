// src/app.module.ts
import { Module } from '@nestjs/common';
import { PlayerModule } from './application/modules/player.module';
import { TournamentModule } from './application/modules/tournament.module';
import { ResultModule } from './application/modules/result.module';
import { AssignmentModule } from './application/modules/assignment.module';
import { PersistenceModule } from './persistence/persistence.module';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './common/interceptors/loggin.interceptor';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PersistenceModule,
    PlayerModule,
    TournamentModule,
    ResultModule,
    AssignmentModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule {}
