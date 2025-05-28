import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, ParseUUIDPipe, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { instanceToPlain } from "class-transformer";
import { AlbumService } from "./album.service";
import { Album } from "./album.entity";
import { CreateAlbumDto, UpdateAlbumDto } from "./album.dto";


@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  @HttpCode(200)
  findAll(): Album[] {
    return this.albumService.findAll()
  }
  @Get(':id')
  @HttpCode(200)
  findById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string): Album {
    const album = this.albumService.findById(id);
    if (!album) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }
    return album;
  }
  @Post()
  @HttpCode(201)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async create(@Body() dto: CreateAlbumDto) {
    const newAlbum = this.albumService.create(dto)
    return instanceToPlain(newAlbum)
  }
  @Put(':id')
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  updatePassword(@Param('id', new ParseUUIDPipe()) id: string, @Body() dto: UpdateAlbumDto) {
    return this.albumService.update(id, dto)
  }
  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.albumService.delete(id)
  }
}