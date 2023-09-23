import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { InfluencersService } from './influencers.service';
import { Influencers } from './entities/influencers.entity';

@Controller('influencers')
export class InfluencersController {
    constructor(private influencersService: InfluencersService) { }

    @Get('/list')
    getInfluencerList(): Promise<Influencers[]> {
        return this.influencersService.getInfluencerList();
    }

    @Get('/:influencer_id/info')
    getInfluencerInfo(@Param('influencer_id') id: string): Promise<Influencers> {
        return this.influencersService.getInfluencerInfo(id)
    }

    // 골드 순위별 조회
    @Get('/rank/gold/:n')
    getGoldRank(@Param('n') n: number): Promise<Influencers[]> {
        return this.influencersService.getGoldRank(n)
    }

    // 투표 순위별 조회
    @Get('/rank/vote/:n')
    getVoteRank(@Param('n') n: number): Promise<Influencers[]> {
        return this.influencersService.getVoteRank(n)
    }
   
    @Post('/search')
    searchByName(@Body() body: any) {
        const { name } = body;
        return this.influencersService.searchNameContaining(name);
    }
}
