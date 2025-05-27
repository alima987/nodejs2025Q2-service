import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, ParseUUIDPipe, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { instanceToPlain } from "class-transformer";
import { TrackService } from "./track.service";
import { Track } from "./track.entity";
import { CreateTrackDto, UpdateTrackDto } from "./track.dto";

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  @HttpCode(200)
  findAll(): Track[] {
    return this.trackService.findAll()
  }
  @Get(':id')
  @HttpCode(200)
  findById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string): Track {
    const track = this.trackService.findById(id);
    if (!track) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return track;
  }
  @Post()
  @HttpCode(201)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async create(@Body() dto: CreateTrackDto) {
    const newTrack = this.trackService.create(dto)
    return instanceToPlain(newTrack)
  }
  @Put(':id')
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  updatePassword(@Param('id', new ParseUUIDPipe()) id: string, @Body() dto: UpdateTrackDto) {
    return this.trackService.update(id, dto)
  }
  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.trackService.delete(id)
  }
}