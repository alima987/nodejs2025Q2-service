import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { ArtistsModule } from './artists/artists.module';
import { AlbumModule } from './albums/album.module';
import { FavoritesModule } from './favorites/favs.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { LoggerModule } from './log/log.module';
import { TracksModule } from './tracks/track.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    UserModule,
    TracksModule,
    ArtistsModule,
    AlbumModule,
    FavoritesModule,
    PrismaModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    AuthModule,
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
