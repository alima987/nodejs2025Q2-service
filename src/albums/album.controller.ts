import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto, UpdateAlbumDto } from './album.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @UseGuards(AuthGuard)
  @Get()
  @HttpCode(200)
  findAll() {
    return this.albumService.findAll();
  }
  @UseGuards(AuthGuard)
  @Get(':id')
  @HttpCode(200)
  findById(@Param('id') id: string) {
    return this.albumService.findById(id);
  }
  @UseGuards(AuthGuard)
  @Post()
  @HttpCode(201)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }
  @UseGuards(AuthGuard)
  @Put(':id')
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async updatePassword(@Param('id') id: string, @Body() dto: UpdateAlbumDto) {
    return this.albumService.update(id, dto);
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param('id') id: string) {
    return this.albumService.delete(id);
  }
}
