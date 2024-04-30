import { Module } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteController } from './favorite.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProfileModule } from 'src/profile/profile.module';
import { ProfileService } from 'src/profile/profile.service';

@Module({
  controllers: [FavoriteController],
  providers: [FavoriteService, ProfileService],
  imports: [PrismaModule, ProfileModule],
})
export class FavoriteModule {}
