import { Module } from '@nestjs/common';
import { ArtistService } from './artists.service';
import { ArtistController } from './artists.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule],
  controllers: [ArtistController],
  providers: [ArtistService, JwtService],
})
export class ArtistsModule {}
