import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsUUID, IsNumber, IsOptional } from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsUUID()
  artistId: string | null;

  @IsOptional()
  @IsUUID()
  albumId: string | null;

  @IsNumber()
  duration: number;
}
export class UpdateTrackDto extends PartialType(CreateTrackDto) {}
