import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { GamesModule } from './games/games.module';
import { GenderModule } from './gender/gender.module';
import { ProfileModule } from './profile/profile.module';
import { FavoriteModule } from './favorite/favorite.module';

@Module({
  imports: [PrismaModule, UserModule, GamesModule, GenderModule, ProfileModule, FavoriteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
