import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { Advertisement } from './entities/advertisement.entity';
import { AdvertisementRepository } from './advertisement.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Advertisement])],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, AdvertisementRepository],
})
export class UsersModule {}
