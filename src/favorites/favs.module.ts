import { Module } from '@nestjs/common';
import { FavoriteService } from './favs.service';
import { FavoriteController } from './favs.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule],
  controllers: [FavoriteController],
  providers: [FavoriteService, JwtService],
})
export class FavoritesModule {}
