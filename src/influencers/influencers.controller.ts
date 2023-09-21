import { Controller, Get, Param } from '@nestjs/common';
import { InfluencersService } from './influencers.service';
import { Influencers } from './entities/influencers.entity';

@Controller('influencers')
export class InfluencersController {
    constructor(private influencersService: InfluencersService) { }

    @Get('/list')
    getInfluencerList(): Promise<Influencers[]> {
        return this.influencersService.getInfluencerList();
    }

    @Get('/:influencer_name/info')
    getInfluencerInfo(@Param('influencer_name') name: string): Promise<Influencers> {
        return this.influencersService.getInfluencerInfo(name)
    }

    // 골드 순위별 조회
    // 투표 순위별 조회
}
