import { Controller, Delete, Get, HttpCode, Param, Post } from "@nestjs/common";
import { FavoritesService } from "./favs.service";
import { FavoritesResponse } from "./favs.dto";

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @HttpCode(200)
  getAll(): FavoritesResponse {
    return this.favoritesService.getAllFavorites();
  }
  @Post(':id')
  @HttpCode(201)
  addTrack(@Param('id') id: string) {
    return this.favoritesService.addTrackToFavorites(id);
  }

  @Delete(':id')
  @HttpCode(204)
  removeTrack(@Param('id') id: string) {
    this.favoritesService.removeTrackFromFavorites(id);
  }
  @Post(':id')
  @HttpCode(201)
  addAlbum(@Param('id') id: string) {
    return this.favoritesService.addAlbumToFavorites(id);
  }

  @Delete(':id')
  @HttpCode(204)
  removeAlbum(@Param('id') id: string) {
    this.favoritesService.removeAlbumFromFavorites(id);
  }
  @Post(':id')
  @HttpCode(201)
  addArtist(@Param('id') id: string) {
    return this.favoritesService.addArtistToFavorites(id);
  }

  @Delete(':id')
  @HttpCode(204)
  removeArtist(@Param('id') id: string) {
    this.favoritesService.removeArtistFromFavorites(id);
  }
}
