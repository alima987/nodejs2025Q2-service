import { BadRequestException, Injectable, NotFoundException, UnprocessableEntityException } from "@nestjs/common";
import { AlbumService } from "src/albums/album.service";
import { ArtistService } from "src/artists/artists.service";
import { TrackService } from "src/tracks/track.service";
import { FavoritesResponse } from "./favs.dto";
import { isUUID } from "class-validator";

@Injectable()
export class FavoritesService {
  private favoriteArtists: string[] = [];
  private favoriteAlbums: string[] = [];
  private favoriteTracks: string[] = [];

  constructor(
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
  ) {}

  getAllFavorites(): FavoritesResponse {
    const artists = this.favoriteArtists
      .map(id => this.artistService.findById(id))
      .filter(Boolean);

    const albums = this.favoriteAlbums
      .map(id => this.albumService.findById(id))
      .filter(Boolean);

    const tracks = this.favoriteTracks
      .map(id => this.trackService.findById(id))
      .filter(Boolean);

    return { artists, albums, tracks };
  }
  
  addTrackToFavorites(id: string) {
      if (!isUUID(id)) {
        throw new BadRequestException('Invalid trackId (not UUID)');
      }
  
      const track = this.trackService.findById(id);
      if (!track) {
        throw new UnprocessableEntityException(`Track with id ${id} doesn't exist`);
      }
  
      if (!this.favoriteTracks.includes(id)) {
      this.favoriteTracks.push(id);
    }
  
      return { message: `Track ${id} added to favorites` };
    }
  
    removeTrackFromFavorites(id: string) {
      if (!isUUID(id)) {
        throw new BadRequestException('Invalid trackId (not UUID)');
      }
  
      const index = this.favoriteTracks.indexOf(id);
      if (index === -1) {
        throw new NotFoundException(`Track with id ${id} is not in favorites`);
      }
  
      this.favoriteTracks.splice(index, 1);
    }

    addAlbumToFavorites(id: string) {
        if (!isUUID(id)) {
          throw new BadRequestException('Invalid albumId (not UUID)');
        }
    
        const album = this.albumService.findById(id);
        if (!album) {
          throw new UnprocessableEntityException(`Album with id ${id} doesn't exist`);
        }
    
        if (!this.favoriteAlbums.includes(id)) {
        this.favoriteAlbums.push(id);
      }
    
        return { message: `Album ${id} added to favorites` };
      }
    
    removeAlbumFromFavorites(id: string) {
        if (!isUUID(id)) {
          throw new BadRequestException('Invalid albumId (not UUID)');
        }
    
        const index = this.favoriteAlbums.indexOf(id);
        if (index === -1) {
          throw new NotFoundException(`Album with id ${id} is not in favorites`);
        }
    
        this.favoriteAlbums.splice(index, 1);
      }

    addArtistToFavorites(id: string) {
          if (!isUUID(id)) {
            throw new BadRequestException('Invalid artistId (not UUID)');
          }
      
          const artist = this.artistService.findById(id);
          if (!artist) {
            throw new UnprocessableEntityException(`Artist with id ${id} doesn't exist`);
          }
      
          if (!this.favoriteArtists.includes(id)) {
          this.favoriteArtists.push(id);
        }
      
          return { message: `Artist ${id} added to favorites` };
        }
      
    removeArtistFromFavorites(id: string) {
          if (!isUUID(id)) {
            throw new BadRequestException('Invalid artistId (not UUID)');
          }
      
          const index = this.favoriteArtists.indexOf(id);
          if (index === -1) {
            throw new NotFoundException(`Artist with id ${id} is not in favorites`);
          }
      
          this.favoriteArtists.splice(index, 1);
    }
}
