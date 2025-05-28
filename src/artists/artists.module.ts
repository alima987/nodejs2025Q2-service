import { Module } from "@nestjs/common";
import { ArtistController } from "./artists.controller";
import { ArtistService } from "./artists.service";

@Module({
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}