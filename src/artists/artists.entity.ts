import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;

  constructor(partial?: Partial<Artist>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}

