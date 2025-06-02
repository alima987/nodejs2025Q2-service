import { Album } from 'src/albums/album.entity';
import { Artist } from 'src/artists/artists.entity';
import { Track } from 'src/tracks/track.entity';

export interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
