import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { albums } from './album.storage';
import { Album } from './album.entity';
import { CreateAlbumDto, UpdateAlbumDto } from './album.dto';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class AlbumService {
  constructor(private readonly emitter: EventEmitter2) {}
  private albums = albums;
  findAll(): Album[] {
    return this.albums;
  }
  findById(id: string): Album | undefined {
    return this.albums.find((u) => u.id === id);
  }
  create(dto: CreateAlbumDto): Album {
    const newAlbum = new Album({
      id: uuidv4(),
      ...dto,
    });
    this.albums.push(newAlbum);
    return newAlbum;
  }
  update(id: string, dto: UpdateAlbumDto): Album {
    const album = this.albums.find((u) => u.id === id);
    if (!album) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }
    Object.assign(album, dto);
    return album;
  }
  delete(id: string): void {
    const userIndex = this.albums.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }
    this.albums.splice(userIndex, 1);
    this.emitter.emit('album.deleted', id);
  }
  
  @OnEvent('artist.deleted')
  nullifyArtistInAlbums(artistId: string) {
    for (const album of this.albums) {
      if (album.artistId === artistId) {
        album.artistId = null;
      }
    }
  }
}
