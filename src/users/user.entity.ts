import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  VersionColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  login: string;

  @Exclude()
  @Column()
  password: string;

  @VersionColumn()
  version: number;

  @CreateDateColumn({ type: 'bigint' })
  createdAt: number;

  @UpdateDateColumn({ type: 'bigint' })
  updatedAt: number;

  constructor(partial?: Partial<User>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}
