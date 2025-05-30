import { forwardRef, Module } from "@nestjs/common";
import { FavoritesController } from "./favs.controller";
import { FavoritesService } from "./favs.service";
import { ArtistModule } from "src/artists/artists.module";
import { AlbumModule } from "src/albums/album.module";
import { TrackModule } from "src/tracks/track.module";

@Module({
  imports: [ArtistModule, AlbumModule, TrackModule],
  controllers: [FavoritesController],
  providers: [FavoritesService],
  exports: [FavoritesService],
})
export class FavoritesModule {}
