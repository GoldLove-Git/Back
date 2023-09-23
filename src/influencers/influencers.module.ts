import { Module } from '@nestjs/common';
import { InfluencersController } from './influencers.controller';
import { InfluencersService } from './influencers.service';
import { InfluencerRepository } from './influencers.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      InfluencerRepository
    ])
  ],
  controllers: [InfluencersController],
  providers: [InfluencersService, InfluencerRepository],
  exports : [InfluencerRepository]
}) 
export class InfluencersModule {}
