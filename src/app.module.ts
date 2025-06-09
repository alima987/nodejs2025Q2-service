import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { TrackModule } from './tracks/track.module';
import { ArtistModule } from './artists/artists.module';
import { AlbumModule } from './albums/album.module';
import { FavoritesModule } from './favorites/favs.module';
import { EventEmitterModule } from '@nestjs/event-emitter'
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: +process.env.DB_PORT || 8080,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'your_password',
      database: process.env.DB_NAME || 'your_database',
      entities: [__dirname + '/**/*.entity{.ts,.js}'], 
      synchronize: true, 
    }),
    UserModule,
    TrackModule,
    ArtistModule,
    AlbumModule,
    FavoritesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
