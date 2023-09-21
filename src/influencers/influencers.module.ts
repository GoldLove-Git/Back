import { Module } from '@nestjs/common';
import { InfluencersController } from './influencers.controller';
import { InfluencersService } from './influencers.service';

@Module({
  controllers: [InfluencersController],
  providers: [InfluencersService]
})
export class InfluencersModule {}
