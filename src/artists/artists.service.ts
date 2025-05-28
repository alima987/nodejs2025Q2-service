import { Injectable, NotFoundException } from "@nestjs/common";
import { v4 as uuidv4 } from 'uuid';
import { artists } from "./artists.storage";
import { Artist } from "./artists.entity";
import { CreateArtistDto, UpdateArtistDto } from "./artists.dto";

@Injectable()
export class ArtistService {
  private artists = artists
  findAll(): Artist[] {
    return this.artists
  }
  findById(id: string): Artist | undefined {
    return this.artists.find(u => u.id === id);
  }
  create(dto: CreateArtistDto): Artist {
    const newArtist = new Artist({
      id: uuidv4(),
      ...dto,
    })
    this.artists.push(newArtist);
    return newArtist
  }
  update(id: string, dto: UpdateArtistDto): Artist {
    const artist = this.artists.find(u => u.id === id)
    if (!artist) {
        throw new NotFoundException(`Artist with id ${id} not found`)
    }
    Object.assign(artist, dto);
    return artist; 
  }
  delete(id: string): void  {
    const userIndex = this.artists.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }
    this.artists.splice(userIndex, 1);
  }
}
