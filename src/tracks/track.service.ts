import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { tracks } from './track.storage';
import { Track } from './track.entity';
import { CreateTrackDto, UpdateTrackDto } from './track.dto';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class TrackService {
  constructor(private readonly emitter: EventEmitter2) {}
  private tracks = tracks;
  findAll(): Track[] {
    return this.tracks;
  }
  findById(id: string): Track | undefined {
    return this.tracks.find((u) => u.id === id);
  }
  create(dto: CreateTrackDto): Track {
    const newTrack = new Track({
      id: uuidv4(),
      ...dto,
    });
    this.tracks.push(newTrack);
    return newTrack;
  }
  update(id: string, dto: UpdateTrackDto): Track {
    const track = this.tracks.find((u) => u.id === id);
    if (!track) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }
    Object.assign(track, dto);
    return track;
  }
  delete(id: string): void {
    const userIndex = this.tracks.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }
    this.tracks.splice(userIndex, 1);
    this.emitter.emit('track.deleted', id);
  }
  @OnEvent('artist.deleted')
  nullifyArtistInTracks(artistId: string) {
    for (const track of this.tracks) {
      if (track.artistId === artistId) {
        track.artistId = null;
      }
    }
  }

  @OnEvent('album.deleted')
  nullifyAlbumInTracks(albumId: string) {
    for (const track of this.tracks) {
      if (track.albumId === albumId) {
        track.albumId = null;
      }
    }
  }
}
