import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable
} from 'typeorm';
import { Artist } from '../artists/artists.entity';
import { Album } from '../albums/album.entity';
import { Track } from '../tracks/track.entity';

@Entity()
export class Favorites {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => Artist)
  @JoinTable()
  artists: Artist[];

  @ManyToMany(() => Album)
  @JoinTable()
  albums: Album[];

  @ManyToMany(() => Track)
  @JoinTable()
  tracks: Track[];

  constructor(partial?: Partial<Favorites>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}
