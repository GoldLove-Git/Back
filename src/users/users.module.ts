import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { Advertisement } from './entities/advertisement.entity';
import { AdvertisementRepository } from './advertisement.repository';
import { GoldHistory } from './entities/goldHistory.entity';
import { GoldHistoryRepository } from './goldhistory.repository';
import { InfluencerRepository } from 'src/influencers/influencers.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Advertisement, GoldHistory])],
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersRepository,
    AdvertisementRepository,
    GoldHistoryRepository,
    InfluencerRepository
  ],
  exports: [UsersService],
})
export class UsersModule {}  
