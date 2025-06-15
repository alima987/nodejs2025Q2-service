import { DataSource } from 'typeorm';
import { User } from '../users/user.entity';
import { Album } from '../albums/album.entity';
import { Artist } from '../artists/artists.entity';
import { Track } from '../tracks/track.entity';
import { Favorites } from '../favorites/favs.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Album, Artist, Track, Favorites],
  synchronize: true, 
});
