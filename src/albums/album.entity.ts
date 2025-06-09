import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @Column({ type: 'uuid', nullable: true })
  artistId: string | null;

  constructor(partial?: Partial<Album>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}

