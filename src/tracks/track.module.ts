import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TracksController } from './track.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule],
  controllers: [TracksController],
  providers: [TrackService, JwtService],
})
export class TracksModule {}
