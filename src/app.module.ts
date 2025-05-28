import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { TrackModule } from './tracks/track.module';
import { ArtistModule } from './artists/artists.module';
import { AlbumModule } from './albums/album.module';

@Module({
  imports: [UserModule, TrackModule, ArtistModule, AlbumModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
