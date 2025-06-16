import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4, validate } from 'uuid';
import { albums } from './album.storage';
import { Album } from './album.entity';
import { CreateAlbumDto, UpdateAlbumDto } from './album.dto';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AlbumService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly emitter: EventEmitter2,
  ) {}
  private albums = albums;
  async findAll(){
    return await this.prisma.album.findMany();
  }
  async findById(id: string) {
    if (!validate(id)) throw new BadRequestException('Invalid id (not uuid)');
    const album = await this.prisma.album.findUnique({ where: { id } });
    if (!album) {
      throw new NotFoundException('Album with such id was not found');
    }
    return album;
  }
  async create(dto: CreateAlbumDto) {
    if (!dto.name || !dto.year) {
      throw new BadRequestException('body does not contain required fields');
    }

    const newAlbum = await this.prisma.album.create({ data: dto });
    return newAlbum;
  }
  async update(id: string, dto: UpdateAlbumDto){
    if (!validate(id)) {
      throw new BadRequestException('invalid id (not uuid)');
    }

    if (!dto.name && !dto.year) {
      throw new BadRequestException('Name or grammy is not defined');
    }

    if (
      typeof dto.name !== 'string' &&
      typeof dto.year !== 'number' &&
      typeof dto.artistId !== 'string'
    ) {
      throw new BadRequestException('Type of name or grammy is not valid');
    }

    const album = await this.prisma.album.findUnique({ where: { id } });
    if (!album) {
      throw new NotFoundException('User not found');
    }

    const updatedAlbum = await this.prisma.album.update({
      where: { id },
      data: dto,
    });
    return updatedAlbum;
  }
  async delete(id: string){
    if (!validate(id)) {
      throw new BadRequestException('invalid id (not uuid)');
    }

    const album = await this.prisma.album.findUnique({ where: { id } });
    if (!album) {
      throw new NotFoundException('Album with such id was not found');
    }

    const favorites = await this.prisma.favorites.findMany({
      where: {
        albums: { some: { id } },
      },
    });
    for (const favorite of favorites) {
      await this.prisma.favorites.update({
        where: { id: favorite.id },
        data: {
          albums: {
            disconnect: {
              id,
            },
          },
        },
      });
    }

    await this.prisma.album.delete({ where: { id } });
    await this.prisma.track.deleteMany({ where: { albumId: id } });
  }
  }

